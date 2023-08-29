<script>
    let files = [];
    let uploadDisabled = true;

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
                console.log(files)
                fetch('http://localhost:8080/files/upload', {
                    method: 'POST',
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({
                        files: files,
                    })
                })
                    .then(res => res.json())
                    .then((data) => {
                        console.log(JSON.stringify(data));
                        files = [];
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
    <p >{files.length} {files.length === 1 ? 'file' : 'files'} selected</p>
    <label>
        <input id="input" on:change={e => files = e.target.files} class="custom-file-input" type="file" multiple>
    </label>
</div>
<div id="upload" on:click={uploadFile} on:keypress={uploadFile} class="actionButton {!uploadDisabled ? 'neonEffect actionButton_active' : 'neonOff'}">Upload File</div>

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
        margin: 2em 0;
        padding: 0.5em 1em;
        font-size: 1.3em;
        text-decoration: none;
        letter-spacing: 0.25em;
        border-radius: 20px;
        font-family: "Yellowtail", sans-serif;
        border: 2px solid darkgrey;
    }

    .actionButton_active {
        border: 2px solid white;
        box-shadow: 0 0 0.8rem var(--clr-blue),
        0 0 1.2rem var(--clr-blue),
        inset 0 0 1.2rem var(--clr-blue);
    }

    .custom-file-input {
        height: 30px;
        position: relative;
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
        top: -11px;
        background: black;
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

</style>