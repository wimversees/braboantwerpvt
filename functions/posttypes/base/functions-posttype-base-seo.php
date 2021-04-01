<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

abstract class SeoBaseType
{
    const SeoGroup           = 'SEO Settings';
    const SeoMetaTitle       = 'seo-meta-title';
    const SeoMetaDescription = 'seo-meta-description';
    const SeoMetaKeywords    = 'seo-meta-keywords';
}

global $seoSharedFieldsSetting;

$seoSharedFieldsSetting = new FieldGroup(
    SeoBaseType::SeoGroup,
    array(
        new FieldConfig(FieldType::SingleLineText, SeoBaseType::SeoMetaTitle, 'Meta Title', false, "Default: page title"),
        new FieldConfig(FieldType::SingleLineText, SeoBaseType::SeoMetaDescription, 'Meta Description', false, "Default: page excerpt"),
        new FieldConfig(FieldType::SingleLineText, SeoBaseType::SeoMetaKeywords, 'Meta Keywords', false, "Keyword list, space separated"),
    )
);