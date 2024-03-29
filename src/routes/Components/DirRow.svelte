<script>
import FileRow from "./FileRow.svelte";

export let color;
export let index;
let childIndex = 0;
const file = {
    name: 'text.txt'
}

const dir = {name: 'directory', files: [{name: 'one.txt'}, {name:"two.txt"}],

    dirs: [
        {name: 'nestedDir', files: [{name: 'three.txt'}, {name: 'four.txt'}]},
        {name: 'Changed', files: [{name: 'three.txt'}, {name: 'four.txt'}]}
    ]}

const handleClick = () => {

}

const getIndex = () => {
    childIndex += 1;
    return childIndex;
}

</script>

<div>
    <div class="file_table_dir">
        <div class="file_table_marking">
                            <div class="file_table_numbering">
                                {index}
                            </div>
            <div class="file_table_depth_bar_wrapper">
                <div class="file_table_depth_bar">

                </div>
            </div>
        </div>
            <div class="file_table_dir_body">
                <div class="file_table_dir_header">
                    <div class="file_table_dir_name">
                        <a class="test">{dir.dirs[0].name}</a>
                    </div>
                    <div class="file_table_dir_open">
                        <div on:click={handleClick}>==></div>
                    </div>
                </div>
                <div class="file_table_dir_content">
                    <div>
                        {#each dir.dirs[0].files as file}
                            <FileRow index={getIndex()} file={file} color="cyan"/>
                        {/each}
                    </div>
                </div>
            </div>
    </div>
</div>

<style>
    .file_table_dir {
        font-size: 18px;
        display: flex;
        border-bottom: 1px solid gray;
    }

    .file_table_marking {
        display: flex;
        height: inherit;
    }

    .file_table_numbering {
        font-size: 20px;
        display: flex;
        justify-content: center;
        padding: 5px 0;
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

    .file_table_dir_header {
        display: flex;
    }

    .file_table_dir_name {
        padding: 5px;
    }

    .file_table_dir_open {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: inherit;
        cursor: pointer;
    }

    .file_table_dir_content {
        display: flex;
    }

    .test {
        border-bottom: 1px solid gray;
    }

    @media screen and (max-width: 768px){
        .file_table_dir {
            font-size: 14px;
        }

        .file_table_numbering {
            font-size: 18px;
        }

        .file_table_depth_bar_wrapper {
            width: 3px;
        }
    }
</style>