<script>

    export let file;
    export let index;

    const handleClick = () => {
        const link = document.createElement('a');
        link.href = file.url;
        link.click();
    }
</script>

<div class="file_table_row">
    <div class="file_table_numbering">
        {index}
    </div>
    <div class="file_table_depth_bar">

    </div>
    <div class="file_table_file_name">
        <a on:click={handleClick} class="test">{file.name}</a>
    </div>
    <div class="file_table_file_download">
        <img alt="Download" on:click={handleClick} src="./src/img/download_icon.svg" height="20" width="20"/>
    </div>
</div>

<style>
    .file_table_row {
        display: flex;
        font-size: 18px;
    }

    .file_table_numbering {
        display: flex;
        justify-content: center;
        align-items: center;
        height: inherit;
        width: 20px;
        font-size: 20px;
        border-right: 1px solid gray;

    }

    .file_table_depth_bar {
        height: inherit;
        width: 5px;
        margin: 0 3px;
        background-color: aquamarine;
    }

    .file_table_file_name {
        padding: 5px;
        border-left: 1px solid gray;

    }

    .file_table_file_download {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: inherit;
        cursor: pointer;
    }

    .test {
        cursor: pointer;
        color: white;
    }
</style>