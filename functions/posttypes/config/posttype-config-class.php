<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

class PostTypeConfig
{
    public $postType     = '';
    public $singularName = '';
    public $pluralName   = '';
    public $fields       = array();

    public function __construct($postType, $singularName, $pluralName, $fields = array())
    {
        $this->postType     = $postType;
        $this->singularName = $singularName;
        $this->pluralName   = $pluralName;
        $this->fields       = $fields;
    }
}
