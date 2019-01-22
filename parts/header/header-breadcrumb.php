<?php if(is_home() || is_front_page()){

} else { ?>
    <div class="bg-light pt-5">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <?php echo wiver_breadcrumb(); ?>
                </div>
            </div>
        </div>
    </div>
<?php } ?>