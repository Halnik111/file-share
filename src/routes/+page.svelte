
<script>
    import '../style.css';
    import {onMount} from "svelte";
    import Upload from "./file/Upload.svelte";
    import Search from "./file/Search.svelte";
    import Browser from "./file/Browser.svelte";

    let windowSize;
    let action = 'download';
    let response;

    onMount( () => {
        windowSize = window.innerWidth;
        window.addEventListener('resize', () => {
            windowSize = `${window.innerWidth}`
        });
    })
</script>

<body>
<div class="menu">
    <a href="/" class="neon_logo neonEffect border" >File-<span class="flickEffect">S</span>hare</a>


    <div class="menu_box border">
        <div class="option_buttons">
            <div on:click={() => action = 'download'} on:keypress={() => action = 'download'} class="option_button"><div class="submit {action === 'download' ? 'neonEffect' : 'neonOff'}">Search</div></div>
            <div on:click={() => action = 'upload'} on:keypress={() => action = 'download'} class="option_button"><div class="submit {action === 'upload' ? 'neonEffect' : 'neonOff'}">Upload</div></div>
        </div>
        {#if action === 'download'}
            <Search bind:response={response} />
        {:else if action === 'upload'}
            <Upload />
        {/if}
    </div>
</div>

    {#if Array.isArray(response)}
        <Browser response={response}/>
    {/if}
</body>

<style>
    .menu {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .menu_box {
        margin-bottom: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border-radius: 50px;
        padding: 30px;
        width: 270px;
        height: 270px;
    }

    .neon_logo {
        font-family: "Yellowtail", sans-serif;
        cursor: pointer;
        margin-top: 40px;
        margin-bottom: auto;
        text-transform: none;
        font-size: 2.2em;
        padding: 25px;
        border-radius: 25px;
        letter-spacing: 0.1em;
    }

    .option_buttons {
        display: flex;
        gap: 25px;
    }

    .submit {
        color: white;
        transition: all 0.5s ease;
        letter-spacing: 0.1rem;
        margin-left: 0.1rem;
    }

    .option_button {
        font-size: 1.5em;
        padding: 0.4em 1em;
        border-radius: 20px;
        cursor: pointer;
    }



    @media screen and (max-width: 768px){
        .menu {
            justify-content: start;
        }
    }

</style>