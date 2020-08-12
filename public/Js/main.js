function showFileDetails() {
    var nameInput = document.getElementById("fileName");
    //var sizeLabel = document.getElementById("fileSize");

    var selectedFile = document.getElementById('fileInput');
    nameInput.value = selectedFile.files.item(0).name + ", " + formatBytes(selectedFile.files.item(0).size, 2);
};

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function showProgress() {
    document.getElementById("uploadProgress").classList.remove("d-none");
}

$('#uploadModal').on('hide.bs.modal', function () {
    document.getElementById("fileName").value = "";
})