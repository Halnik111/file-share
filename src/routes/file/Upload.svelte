<script>
    let files = [];
    let uploadDisabled = true;

    $: {
        if (files.length > 0) {
            uploadDisabled = false
        }
    }

    const uploadFile = () => {
        if (!uploadDisabled) {
            let reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.onload = async e => {
                await fetch('http://localhost:8080/files/upload', {
                    method: 'POST',
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({
                        file: e.target.result,
                        name: files[0].name})
                }) .then(res => res.json())
                    .then((data) => {
                        console.log(JSON.stringify(data));
                        files = [];
                        uploadDisabled = true;
                    })
            }
        }
    }

    // const uploadFileTest = async (e) => {
    //     let image = e.target.files[0];
    //     console.log(image)
    //     const formData = new FormData();
    //     formData.append('file', image);
    //     await fetch('http://localhost:8080/upload', {
    //         method: 'POST',
    //         headers: {"Content-Type" : "multipart/form-data"},
    //         body: formData
    //     }) .then(res => console.log(res.json()))
    // }



</script>

<div class="form">
    <p >{files.length} {files.length === 1 ? 'file' : 'files'} selected</p>
    <label>
        <input id="input" on:change={e => files = e.target.files} class="custom-file-input" type="file" multiple>
    </label>
</div>
<div id="upload" on:click={uploadFile} on:keypress={uploadFile} class="actionButton {!uploadDisabled ? 'neonEffect' : 'neonOff'}">Upload File</div>

<style>
    .form > p {
        margin-top: 1em;
        color: white;
    }

    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1.4em;
    }

    .actionButton {
        transition: all 0.5s ease;
        font-size: 1.3em;
        margin-top: 35px;
        font-family: "Yellowtail", sans-serif;
        text-decoration: none;
        letter-spacing: 0.25em;
    }

    .custom-file-input::-webkit-file-upload-button {
        visibility: hidden;
    }

    .custom-file-input::before {
        font-family: 'Barlow Semi Condensed', sans-serif;
        color: white;
        content: 'Select File';
        display: inline-block;
        position: absolute;
        left: calc(50% - 75px);
        background: black;
        border-radius: 25px;
        border: solid var(--clr-white) 0.1em;
        box-shadow: 0 0 0.8rem var(--clr-blue),
        0 0 1.2rem var(--clr-blue),
        inset 0 0 0.8rem var(--clr-blue);
        letter-spacing: 0.1em;
        padding: 5px 12px;
        outline: none;
        white-space: nowrap;
        -webkit-user-select: none;
        cursor: pointer;
        font-size: 1.8em;
    }

    .custom-file-input:hover::before {
    }

</style>