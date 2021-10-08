<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

class FieldConfig
{
    public $fieldSlug     = '';
    public $fieldLabel    = '';
    public $fieldType     = 0;
    public $fieldSettings = array();
    public $required      = false;
    public $fieldComment  = '';
    public $fieldEnabled  = true;

    public function __construct($fieldType, $fieldSlug, $fieldLabel, $required = false, $fieldComment = '', $fieldSettings = array(), $fieldEnabled = true)
    {
        $this->fieldSlug     = $fieldSlug;
        $this->fieldLabel    = $fieldLabel;
        $this->fieldType     = $fieldType;
        $this->fieldSettings = $fieldSettings;
        $this->required      = $required;
        $this->fieldComment  = $fieldComment;
        $this->fieldEnabled  = $fieldEnabled;
    }
}