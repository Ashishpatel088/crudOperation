let reglist=[];
let newid = null;
let btn = document.getElementById('submit');    
var loadFile = function(event) {
	var image = document.getElementById('myimage');
	image.src = URL.createObjectURL(event.target.files[0]);
    image.style.display = "block";
};
let formstore = localStorage.getItem('localstore');
//console.log(formstore,'local')
if(formstore === null) {
    reglist = [];
} else {
    reglist = JSON.parse(formstore);

}

window.addEventListener("load",() => {
    reglist.map((item, index) => {
        getFormData(item, index);
        // console.log(formDetail(item),'loadding data');
        
    })
})

function setError(id,error) {
    let element = document.getElementById(id);
    element.innerHTML  = error;
}
// first name
function firstnameValidation() {
    let name = document.forms["contactForm"]["fname"].value.trim();
    if(name === '') {
        //console.log(name.length);
        setError('text-error', "*must be enter input");
        return true;
     } 
     else {
        setError('text-error', "");
        return false;
    }
}

// email 

function emailValidatiojn() {
     let email = document.forms["contactForm"]["email"].value.trim();
     if(email === '') {
        setError('email-error', "*must be enter email");
        return true;
    } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        setError('email-error', "* email not valid Ex:abc@gmail.com");
        //console.log('not valids');
    }
     else {
        // console.log("emailval");
        setError('email-error', "");
        return false;
     }
}

// phone 
function phoneValidatiojn() {
    let phone = document.forms["contactForm"]["phoneNumber"].value.trim();
    if(phone === '') {
       setError('phone-error', "*must be enter phonenumber");
       return true;
   }
    else if(!phone.match(/^\d{10}$/)) {
       setError('phone-error', "* phonenumber must be 10 digit");
    } else {
       setError('phone-error', "");
       return false;
    }

}

// hobbys 
function checkboxValidation() {
    let chkBox = document.forms["contactForm"]["hobby"];
    let chkInput = [];
        for(let i=0; i< chkBox.length;i++) {
            if(chkBox[i].checked) {
                chkInput.push(chkBox[i].value);
                //console.log(chkInput,"hobby value");
            }
        }
        if(chkInput.length > 0) {
            //console.log(chkInput,"error val");
            setError('checked-error', "");
            return false;
        } else {
            setError('checked-error', "*please check atlist one hobby");
            return true;
        }

}

// city select 
function selectValidation() {
    let city = document.forms["contactForm"]["city"].value;
   // console.log(city);
    if(city === "") {
        setError('city-error',"*pleas select city")
        return true;
    } else {
        setError('city-error',"");
        return false;
    }
}

// address 
function addressValidation() {
    let address = document.forms["contactForm"]["adress"].value.trim();
    if(address === '') {
        //console.log(name.length);
        setError('address-error', "*must be enter input");
        return true;
     } 
     else {
        setError('address-error', "");
        return false;
    }
}
// image validation
function imageValidation(event) {
    let image = document.forms["contactForm"]["image"].value
    if(image === '') {
        console.log(image === '','imagelog');
        setError('image-error',"*image must be select");
        return true;
    } else {
        
        setError('image-error',"");
        //var imgtag = document.getElementById("myimage");
	   // imgtag.src = URL.createObjectURL(event.target.files[0]);
       // console.log(imgtag.src = URL.createObjectURL(event.target.files[0]),'images');
       // imgtag.style.display = "block";
        }
        return false;
    
}
// submit validate form 
function formvalidation() {
    
    let name = document.forms["contactForm"]["fname"].value.trim();
    let email = document.forms["contactForm"]["email"].value.trim();
    let phone = document.forms["contactForm"]["phoneNumber"].value.trim();
    let chkBox = document.forms["contactForm"]["hobby"];
    let chkInput = [];
        for(let i=0; i< chkBox.length;i++) {
            if(chkBox[i].checked) {
                chkInput.push(chkBox[i].value);
                //console.log(chkInput,"hobby value");
            }
        }
   // console.log(chkBox,"checkbox value");
        let radio = document.forms["contactForm"]["gender"].value;
        let image = document.forms["contactForm"]["image"].value;
        let city = document.forms["contactForm"]["city"].value;
        let address = document.forms["contactForm"]["adress"].value.trim();
        
    if ((firstnameValidation() && emailValidatiojn() && phoneValidatiojn() && checkboxValidation() && selectValidation() &&  addressValidation() && imageValidation()) || (firstnameValidation() || emailValidatiojn() || phoneValidatiojn() || checkboxValidation() || selectValidation() ||  addressValidation() || imageValidation())) {
        //return false; 
        
        console.log('true');
    } else {
            console.log('false');
            const registerData = {
                fname:name,
                emailadd:email,
                phoneno:phone,
                chekBox:chkInput,
                gender:radio,
                image:image,
                dropdown:city,
                textarea:address
            
            }
            if(btn.value === 'submit') {
                //console.log('true','truuu logic');
                formDetail(registerData);
                resetData();
            } else {
                        let indexData = reglist[newid];
                        let trdata = document.getElementById(`DataRow${newid}`);
                        let tableid = document.getElementById("tbody");
                        console.log(trdata,'trid')
                        let updateData = indexData = registerData;
                        reglist.splice(newid,1,updateData);
                        console.log(registerData,'new data');
                        trdata.innerHTML = `<td>${registerData.fname}</td><td>${registerData.emailadd}</td><td>${registerData.phoneno}</td><td>${registerData.chekBox}</td><td>${registerData.gender}</td><td>${registerData.image}</td><td>${registerData.dropdown}</td><td>${registerData.textarea}</td><td><button type="submit" onClick="editFormData(${newid})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button><button id="delbtn" type="submit" onClick="deleteFormData(${newid})"><i class="fa fa-trash" aria-hidden="true"></i></button></td>`
                        localStorage.setItem('localstore',JSON.stringify(reglist));
                        resetData();
                 }
            
    }
    
    
}
function resetData() {

        let name = document.forms["contactForm"]["fname"].value = "";
        email = document.forms["contactForm"]["email"].value = "";
        phone = document.forms["contactForm"]["phoneNumber"].value = "";
        radio = document.forms["contactForm"]["gender"].checked = false;
        chkbox = document.forms["contactForm"]["hobby"].checked = false;
        let image = document.getElementById('myimage').style.display = "none";
        city = document.forms["contactForm"]["city"].value = "";
        address = document.forms["contactForm"]["adress"].value = "";
}

function formDetail(registerData){

            reglist.push(registerData);
            localStorage.setItem('localstore',JSON.stringify(reglist));
            getFormData(registerData,reglist.length-1)
}

function getFormData(registerData, index) {

        let getdata = registerData;
       // console.log(getdata,"array data");
        let newdata = '';
        let tableid = document.getElementById("tbody");
            newdata = newdata + `<tr id="DataRow${index}"> <td>${registerData.fname}</td><td>${registerData.emailadd}</td><td>${registerData.phoneno}</td><td>${registerData.chekBox}</td><td>${registerData.gender}</td><td>${registerData.image}</td><td>${registerData.dropdown}</td><td>${registerData.textarea}</td><td><button type="submit" onClick="editFormData(${index})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button><button id="delbtn" type="submit" onClick="deleteFormData(${index})"><i class="fa fa-trash" aria-hidden="true"></i></button></td></tr>`
            tableid.innerHTML += newdata; 
            //deleteFormData(newIndex) 

}

 function deleteFormData(index) {
        let tableid = document.getElementById(`DataRow${index}`);
        console.log(index,'newIndex');
        reglist.splice(index, 1);
        localStorage.setItem('localstore',JSON.stringify(reglist));
        tableid.remove();
        // console.log(reglist,'del array');
        // //console.log(reglist);
} 
function editFormData(index) {
            newid = index;
            let trdata = document.getElementById(`DataRow${index}`);
            let rowdata = Object.values(reglist[index]);
            document.forms['contactForm']['fname'].value = rowdata[0];
            document.forms["contactForm"]["email"].value = rowdata[1];  
            document.forms["contactForm"]["phoneNumber"].value = rowdata[2];
            document.forms["contactForm"]["gender"].checked= rowdata[3] === 'male';
            console.log(rowdata[5],'imageb b aba');
            rowdata[3].forEach(element => {
                document.getElementById(element).checked = true;
            });
            document.forms["contactForm"]["hobby"].checked = rowdata[4][0];
            //document.forms["contactForm"]["image"].value = rowdata[5];
            document.forms["contactForm"]["city"].value = rowdata[6];
            document.forms["contactForm"]["adress"].value = rowdata[7];
            
            btn.value = 'update';
     
    }
 
