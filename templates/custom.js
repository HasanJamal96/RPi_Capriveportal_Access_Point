var BASE_URL = "http://" + location.hostname  + ":4321";
function sendUser() {
    let uid = document.getElementById("user_ID").value;
    let brd = document.getElementById("birth_Date").value;
    if(uid == "" || brd == "") {
        alert("Invalid input");
        return;
    }
    $.ajax({
        url: BASE_URL + "/scan_files",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ 'uid': uid, 'brd': brd}),
        success: function (data) {
	    let x = '';
	    if(data != "[]") {
                data = data.replace('[', '');
                data = data.replace(']', '');
                data = data.replaceAll("'", '');
                data = data.replaceAll(" ", '');
                data = data.split(',');
                let len = data.length;
                for(let i=0; i<len; i++) {
                    x += '<a class="button" href="' +  BASE_URL + "/get_file?fileName=" + data[i]  + '" download target="_blank" >' + data[i] + '</a>'
                }
            }
            else {
                x = '<h2>No files found :(</h2>';
            }
            let fileList = document.getElementById("fileNames");
            let loginForm = document.getElementById("loginForm");
            fileList.innerHTML = x;
            fileList.style.display = "flex";
            loginForm.style.display = "none";
        }
    });
}

function downloadFile(element) {
    element.preventDefault();
    fileName = element.innerHTML;
    let url = BASE_URL + "/get_file?fileName=" + fileName;
    window.location.href = url;
}

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}
console.log(getMobileOperatingSystem())