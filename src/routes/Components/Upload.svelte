<script>
    let files = [];
    let uploadDisabled = true;
    let pin = '';

    $: {
        if (files.length > 0) {
            uploadDisabled = false
        }
    }

    const uploadFile = async () => {
        if (!uploadDisabled) {
            let readers = [];

            for (const file of files) {
                readers.push(await readFile(file))
            }

            Promise.all(readers).then(files => {
                fetch('http://localhost:8080/files/upload', {
                    method: 'POST',
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({
                        files: files,
                    })
                })
                    .then(res => res.json())
                    .then((data) => {
                        const accessCode = JSON.stringify(data)
                        console.log(accessCode);
                        localStorage.setItem(`pin-${accessCode}-`, new Date().toString());
                        pin = accessCode
                        const reset = document.getElementById('resetFileList');
                        reset.click();
                        uploadDisabled = true;
                    })
            })
        }
    }

    const readFile = async (file) => {
        return new Promise(resolve => {
            console.log(file.name)
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve({
                    data: reader.result,
                    name: file.name
                })
            }
        })
    }


</script>

<div class="form">
    <p> {files.length} {files.length === 1 ? 'file' : 'files'} selected</p>
    <div id="resetFileList" on:click={() => {files = []; uploadDisabled = true}}>Reset</div>
    <label>
        <input id="input" on:change={e => files = e.target.files} class="custom-file-input" type="file" multiple>
    </label>
</div>
<div id="upload" on:click={uploadFile} on:keypress={uploadFile} class="actionButton {!uploadDisabled ? 'neonEffect actionButton_active' : 'neonOff'}">Upload File</div>
{#if pin.length === 4}
    <div class="upload_success">
        <svg width=30 height=30 viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="success_icon" d="M1 6.5C1 6.5 2.34315 11 4 11C5.5 11 12 1.5 12 1.5" stroke=var(--clr-green) stroke-width="2" stroke-linecap="round"/>
        </svg>
        Access Code: 1134
    </div>
<!--    <div class="upload_status">-->
<!--        Access Code: {pin}-->
<!--    </div>-->
{/if}

<style>
    .form > p {
        margin-top: 1em;
        color: var(--clr-white);
    }

    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1.4em;
    }

    #resetFileList {
        margin-bottom: 1em;
        display: none;
    }

    .actionButton {
        transition: all 0.5s ease;
        margin: 2em 0;
        padding: 0.5em 1em;
        font-size: 1.3em;
        text-decoration: none;
        letter-spacing: 0.25em;
        border-radius: 20px;
        font-family: "Yellowtail", sans-serif;
        color: dimgrey;
        border: 2px solid #3f3f40;
    }

    .actionButton_active {
        color: var(--clr-white);
        border: 2px solid white;
        box-shadow: 0 0 0.8rem var(--clr-blue),
        0 0 1.2rem var(--clr-blue),
        inset 0 0 1.2rem var(--clr-blue);
    }

    .custom-file-input {
        height: 30px;
        position: relative;
        color: var(--clr-black);
    }

    .custom-file-input::-webkit-file-upload-button {
        visibility: hidden;
    }

    .custom-file-input::before {
        font-family: 'Barlow Semi Condensed', sans-serif;
        color: var(--clr-white);
        content: 'Select File';
        display: inline-block;
        position: absolute;
        left: calc(50% - 75px);
        top: -11px;
        background: var(--clr-black);
        border-bottom: solid var(--clr-white) 1px;
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

    .upload_success {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 20px;
        border-left: 3px solid var(--clr-green);
        padding: 5px 10px;
    }

</style>