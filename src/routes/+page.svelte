
<script>
    import '../style.css';
    import {onMount} from "svelte";
    import Upload from "./Components/Upload.svelte";
    import Search from "./Components/Search.svelte";
    import Browser from "./Components/Browser.svelte";

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


    <div class="menu_box ">
        <div class="option_buttons">
            <div on:click={() => action = 'download'} on:keypress={() => action = 'download'} class="option_button {action === 'download' ? 'option_button_underline' : ''}"><div class="submit ">Search</div></div>
            <div on:click={() => action = 'upload'} on:keypress={() => action = 'upload'} class="option_button {action === 'upload' ? 'option_button_underline' : ''}"><div class="submit ">Upload</div></div>
        </div>
        {#if action === 'download'}
            <Search bind:response={response} />
        {:else if action === 'upload'}
            <Upload />
        {/if}
    </div>
</div>

    {#if response?.id}
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
        height: 350px;
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
        gap: 20px;
        margin-bottom: 60px;
    }

    .submit {
        color: white;
        letter-spacing: 0.1rem;
        margin-left: 0.1rem;
    }

    .option_buttons > .option_button {
        font-size: 1.5em;
        padding: 0.4em 0.5em;
        cursor: pointer;
    }

    .option_button_underline {
        border-bottom: 3px solid white;
    }

    @media screen and (max-width: 768px){
        .menu {
            justify-content: start;
        }
    }

</style>