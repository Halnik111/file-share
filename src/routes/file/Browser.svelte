
<script>
    import {afterUpdate, onMount} from "svelte";


    export let response;


    const scrollToComponent = () => {
        const browser = document.getElementById('browser');
        if (!browser) return;
        browser.scrollIntoView({behavior: "smooth"});
    }

    const handleClick = () => {
        const link = document.createElement('a');
        link.href = response[0].url;
        link.click();
    }


    afterUpdate(() => {
        scrollToComponent()
    });

</script>


<div id="browser">
    <a on:click={handleClick} class="test">{response[0].name}</a>
</div>


<style>
    #browser {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .test {
        cursor: pointer;
        color: white;
    }
</style>
