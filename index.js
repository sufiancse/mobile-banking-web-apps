document.getElementById('btn-login').addEventListener('click', function(event){
    event.preventDefault()

    const phoneNumber = 12345678910;
    const pin = 1234;

    const phoneNumberValue = parseInt(document.getElementById('phone-number').value);
    const pinNumberValue = parseInt(document.getElementById('pin-number').value);

    if(isNaN(phoneNumberValue) || isNaN(pinNumberValue)){
        alert("Enter Phone Number and Password")
        return;
    }

    if(phoneNumberValue === phoneNumber && pinNumberValue === pin){
        window.location.href = "./home.html"
    }
    else{
        alert('Invalid Number or Pin')
    }
})