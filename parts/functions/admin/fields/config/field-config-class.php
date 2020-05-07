<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

class FieldConfig
{
    public $fieldSlug   = '';
    public $fieldLabel  = '';
    public $fieldType   = 0;
    public $fieldValues = array();

    public function __construct($fieldType, $fieldSlug, $fieldLabel, $fieldValues = array())
    {
        $this->fieldSlug   = $fieldSlug;
        $this->fieldLabel  = $fieldLabel;
        $this->fieldType   = $fieldType;
        $this->fieldValues = $fieldValues;
    }
}
