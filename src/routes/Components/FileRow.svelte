<script>

    export let file;
    export let index;
    export let color;

    const handleClick = () => {
        const link = document.createElement('a');
        link.href = file.url;
        //link.click();
        window.open(file.url, '_blank');
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
        <svg class="download_icon" on:click={handleClick} on:keypress={handleClick} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Frame 6">
                <rect width="20" height="20" fill="none"/>
                <g id="Download Arrow">
                    <path id="Rectangle 13" d="M0 19C0 18.4477 0.447715 18 1 18H19C19.5523 18 20 18.4477 20 19V19C20 19.5523 19.5523 20 19 20H1C0.447716 20 0 19.5523 0 19V19Z" fill="white"/>
                    <g id="Arrow">
                        <path id="Rectangle 12" d="M10.5 2V15C10.5 15.2761 10.2761 15.5 10 15.5C9.72386 15.5 9.5 15.2761 9.5 15V2C9.5 1.72386 9.72386 1.5 10 1.5C10.2761 1.5 10.5 1.72386 10.5 2Z" fill="black" stroke="white"/>
                        <path id="Rectangle 14" d="M3.70711 10.1213C3.31658 9.7308 3.31658 9.09763 3.70711 8.70711V8.70711C4.09763 8.31658 4.7308 8.31658 5.12132 8.70711L10.7782 14.364C11.1687 14.7545 11.1687 15.3877 10.7782 15.7782V15.7782C10.3877 16.1687 9.75449 16.1687 9.36396 15.7782L3.70711 10.1213Z" fill="white"/>
                        <path id="Rectangle 15" d="M10.7071 15.7782C10.3166 16.1687 9.68342 16.1687 9.29289 15.7782V15.7782C8.90237 15.3877 8.90237 14.7545 9.29289 14.364L14.9497 8.70711C15.3403 8.31658 15.9734 8.31658 16.364 8.70711V8.70711C16.7545 9.09763 16.7545 9.7308 16.364 10.1213L10.7071 15.7782Z" fill="white"/>
                    </g>
                </g>
            </g>
        </svg>
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