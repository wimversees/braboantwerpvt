<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

add_action('admin_menu', 'my_admin_menu');

function my_admin_menu()
{
    add_options_page('WIVER Admin Toolbox', 'WIVER Admin Toolbox', 'manage_options', 'wiver-admin-toolbox', 'WiverAdminToolbox');
}

function WiverAdminToolbox()
{
    $permalinkFlushRewrites = 'permalink-flush-rewrites';
    $cachingClearAllCache = 'caching-clear-all-cache';

    $result = '';

    if(isset( $_POST[$permalinkFlushRewrites] )){
        flush_rewrite_rules();
        $result .= '<p>Permalinks flushed.</p>';
    }
    if(isset( $_POST[$cachingClearAllCache] )){
        clearCustomCache();
        $result .= '<p>Cache folder content deleted.</p>';
    }    
    
    ?>
    <?php //screen_icon(); ?>
	<div class="wrap">
		<h2>Welcome To WIVER Admin Toolbox</h2>
        <div class="alert alert-warning"> Please only use these options if you know what you are doing! </div>
        <hr />
        <?php if(strlen($result) > 0){ ?>
        <div class="alert alert-success"> <?php echo $result; ?> </div>
        <?php } ?>
	</div>
    <div class="wrap">
        <form method="post" action="options-general.php?page=wiver-admin-toolbox">
        <h3>Permalinks</h3>
        <table>
            <tr valign="top">
                <th scope="row">
                    <label for="<?php echo $permalinkFlushRewrites; ?>">Flush All Rewrites</label>
                </th>
                <td>
                    <input type="checkbox" id="<?php echo $permalinkFlushRewrites; ?>" name="<?php echo $permalinkFlushRewrites; ?>" />
                </td>
            </tr>
        </table>
        <hr />
        <h3>Caching</h3>
        <table>
            <tr valign="top">
                <th scope="row">
                    <label for="<?php echo $cachingClearAllCache; ?>">Clear All Cache</label>
                </th>
                <td>
                    <input type="checkbox" id="<?php echo $cachingClearAllCache; ?>" name="<?php echo $cachingClearAllCache; ?>" />
                </td>
            </tr>
        </table>
        <?php submit_button("Execute"); ?>
        </form>
    </div>    
	<?php
}