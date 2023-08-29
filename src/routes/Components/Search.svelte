<script>

    export let response;
    let id = '';
    let searchDisabled = true;


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

    const keyInput = (event) => {
        if (event.key === "Enter" && !searchDisabled) {
            findFile();
        }
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
        border: 2px solid darkgrey;
    }

    .actionButton_active {
        border: 2px solid white;
        box-shadow: 0 0 0.8rem var(--clr-blue),
        0 0 1.2rem var(--clr-blue),
        inset 0 0 1.2rem var(--clr-blue);
    }

    .error {
        color: white;
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
        background: black;
        border-bottom: solid var(--clr-white) 0.1em;
        letter-spacing: 0.1em;
        color: var(--clr-white);
    }

    .inputField:focus {
        outline: white;
    }
</style>