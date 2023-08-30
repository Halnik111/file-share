<script>

    import {afterUpdate} from "svelte";
    import Modal from "./Modal.svelte";

    export let response;
    let id = '';
    let searchDisabled = true;
    let accessCodes = [];
    let showEditModal = false;
    let codeName = '';
    let editKey = '';

    $: {
        if (id < 1000) {
            searchDisabled = true
        }
        else if (id < 10000) {
            searchDisabled = false
        }
        else {
            id = id.toString().substring(0,4);
        }
    }

    afterUpdate(() => {
        accessCodes = getSavedCodes();
    });

    const findFile = async () => {
        if (!searchDisabled) {
            await fetch(`http://localhost:8080/files/get/${id}`, {
                method: 'GET',
                headers: {"Content-Type" : "application/json"},
            }) .then(res => res.json())
               .then((data) => {
                   console.log(data)
                   response = data
                   id = '';
               })
               .catch(err => {
                   throw err;
               })
        }
    }

    const getSavedCodes = () => {
        const result = [];
        for (let i = 0; i < localStorage.length; i++) {
            const item = localStorage.key(i);
            if (item.startsWith('pin-')) {
                const pin = item.substring(item.indexOf('-')+1, item.indexOf('-')+5);
                const name = item.substring(item.indexOf('-', item.indexOf('-') + 1) + 1 )
                result.push({pin: pin, name: name});
            }
        }
        return result;
    }

    const keyInput = (event) => {
        if (event.key === "Enter" && !searchDisabled) {
            findFile();
        }
    }

    const editAccessCode =  (accessCode, oldName, newName) => {
        console.log(accessCode);
        const oldPinKey = `pin-${accessCode}-${oldName}`;
        const newPinKey = `pin-${accessCode}-${newName}`
        const accessCodeValue = localStorage.getItem(oldPinKey);
        localStorage.removeItem(oldPinKey);
        localStorage.setItem(newPinKey, accessCodeValue);
        showEditModal = false
        codeName = '';
        console.log(newPinKey)
    }

</script>

<div class="form">
    <p>ID</p>
    <label id="label">
        <input on:keydown={keyInput} bind:value={id} min="4" max="4" type="number" id="input" class="inputField"/>
        {#if response === "no such file"}
            <div class="error">No such file</div>
        {/if}
    </label>
</div>
<div id="download" on:click={findFile} on:keypress={findFile} class="actionButton {!searchDisabled ? 'neonEffect actionButton_active' : 'neonOff'}">Search File</div>
{#if accessCodes.length > 0}
    <div class="saved_codes">
        <div class="saved_codes_header">
            Saved Codes
        </div>
        <div class="saved_codes_content">
            {#each accessCodes as code}
                <div>
                    <div class="saved_code_edit_button" on:click={() => {editKey = code;showEditModal =  true}}>Edit</div> {code.pin} - {code.name}
                </div>
            {/each}
        </div>
    </div>
{/if}

<Modal bind:showEditModal>
    <div class="modal_edit_accessCode">
        <div>
            Pin: {editKey.pin}
        </div>
        <div>
            Name:
            <input bind:value={codeName} type="text" />
            <div class="modal_edit_accessCode_confirm_button" on:click={() => editAccessCode(editKey.pin, editKey.name, codeName)}>OK</div>
        </div>
    </div>
</Modal>

<style>
    .actionButton {
        transition: all 0.5s ease;
        margin: 2em 0;
        padding: 0.5em 1em;
        font-size: 1.3em;
        text-decoration: none;
        letter-spacing: 0.25em;
        border-radius: 20px;
        font-family: "Yellowtail", sans-serif;
        color: var(--clr-gray);
        border: 2px solid #3f3f40;
    }

    .actionButton_active {
        color: var(--clr-white);
        border: 2px solid var(--clr-white);
        box-shadow: 0 0 0.8rem var(--clr-blue),
        0 0 1.2rem var(--clr-blue),
        inset 0 0 1.2rem var(--clr-blue);
    }

    .error {
        color: var(--clr-white);
        margin: 5px 0;
    }

    #label {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    p {
        margin-left: 0.25em;
        margin-bottom: 0.5em;
        color: var(--clr-white);
    }

    .form > p {
        margin-top: 1em;
    }

    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 1.4em;
    }

    .inputField {
        font-family: 'Barlow Semi Condensed', sans-serif;
        margin: 0;
        padding: 0.2em;
        width: 80px;
        font-size: 1em;
        text-align: center;
        background: var(--clr-black);
        border-bottom: solid var(--clr-white) 0.1em;
        letter-spacing: 0.1em;
        color: var(--clr-white);
    }

    .inputField:focus {
        outline: var(--clr-white);
    }

    .saved_codes {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .saved_codes_header {
        font-size: 20px;
        margin-bottom: 10px;
    }

    .saved_codes_content {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .saved_code_edit_button {
        cursor: pointer;
        display: inline-block;
        border-right: 1px solid white;
        padding-right: 6px;
    }

    .modal_edit_accessCode_confirm_button {
        display: inline-block;
        cursor: pointer;
    }

</style>