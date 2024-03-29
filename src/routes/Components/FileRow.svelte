<script>

    export let file;
    export let index;
    export let color;

    const handleClick = () => {
        const link = document.createElement('a');
        link.href = file.url;
        link.click();
    }
</script>

<div class="file_table_row">
    <div class="file_table_marking">
        <div class="file_table_numbering">
            {index}
        </div>
        <div class="file_table_depth_bar_wrapper">
            <div class="file_table_depth_bar" style="background-color: {color}">

            </div>
        </div>
    </div>
    <div class="file_table_file_download">
        <img class="download_icon" alt="Download" on:click={handleClick} src="./src/img/download_icon.svg" height="20" width="20"/>
    </div>
    <div class="file_table_file_name">
        <a class="test">{file.name}</a>
    </div>

</div>

<style>
    .file_table_row {
        display: flex;
        font-size: 18px;
    }

    .file_table_file_name {
        padding: 5px;
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
        color: var(--clr-white);
    }

    .file_table_marking {
        display: flex;
        height: inherit;
    }

    .file_table_numbering {
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 10px;
        margin: 0 2px;
    }

    .file_table_depth_bar_wrapper {
        width: 5px;
        padding: 0 3px;
    }

    .file_table_depth_bar {
        height: 100%;
        background-color: var(--clr-green);
    }

    @media screen and (max-width: 768px){
        .file_table_row {
            font-size: 14px;
        }

        .file_table_numbering {
            font-size: 18px;
        }

        .download_icon {
            width: 16px;
            height: 16px;
        }

        .file_table_file_download {
            width: 20px;
        }

        .file_table_depth_bar_wrapper {
            width: 3px;
        }
    }
</style>