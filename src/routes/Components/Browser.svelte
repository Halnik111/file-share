
<script>
    import {afterUpdate} from "svelte";
    import FileRow from "./FileRow.svelte";


    export let response;
    let index = 0;

    const scrollToComponent = () => {
        const browser = document.getElementById('browser');
        if (!browser) return;
        browser.scrollIntoView({behavior: "smooth"});
    }

    const getIndex = () => {
        index += 1;
        return index;
    }


    afterUpdate(() => {
        scrollToComponent()
    });

</script>


<div id="browser">
    <div class="file_table">
        <div class="file_table_header">
            <h3>File ID No: {response.id}</h3>
        </div>
        <div class="file_table_content">
            {#each response.files as file}
                <FileRow index={getIndex()} file={file}/>
            {/each}
        </div>
    </div>
</div>


<style>
    #browser {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .file_table {
        border-bottom: 1px solid gray;
    }

    .file_table_header {
        padding-bottom: 10px;
        border-bottom: 1px solid gray;
    }

    .file_table_content {
        display: flex;
        flex-direction: column;
    }
</style>
