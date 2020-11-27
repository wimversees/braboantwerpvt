<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

class TaxonomyConfig
{
    public $taxonomyType     = '';
    public $singularName     = '';
    public $pluralName       = '';
    public $fields           = array();
    public $enabledPostTypes = array();

    public function __construct($taxonomyType, $singularName, $pluralName, $enabledPostTypes = array(), $fields = array())
    {
        $this->taxonomyType     = $taxonomyType;
        $this->singularName     = $singularName;
        $this->pluralName       = $pluralName;
        $this->enabledPostTypes = $enabledPostTypes;
        $this->fields           = $fields;
    }
}