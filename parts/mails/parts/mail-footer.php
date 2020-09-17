<?php

function mailFooter()
{ ?>
</td>
</tr>
</table>
</td>
</tr>

<!-- END MAIN CONTENT AREA -->
</table>

<!-- START FOOTER -->
<div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
    <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
        <tr>
            <td class="content-block"
                style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">
                    <a href="<?php echo bloginfo('url'); ?>" title="<?php echo bloginfo('name'); ?>" target="_blank"
                        style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;"><?php echo bloginfo('name'); ?></a>
                    <br />
                    <?php echo c('company-street'); ?>, <?php echo c('company-postalcode'); ?> <?php echo c('company-city'); ?>
                    <br />
                    <?php echo c('company-telephone'); ?>
                </span>
            </td>
        </tr>
        <tr>
            <td class="content-block powered-by"
                style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 10px; color: #999999; text-align: center;">
                Proudly powered by <a href="https://wiver.be" title="WIVER - Experts in creating your digital world"
                    style="color: #999999; font-size: 10px; text-align: center; text-decoration: none;">WIVER - Experts in
                    creating your digital world</a>.
            </td>
        </tr>
    </table>
</div>
<!-- END FOOTER -->

<!-- END CENTERED WHITE CONTAINER -->
</div>
</td>
<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
</tr>
</table>
</body>

</html>
<?php }