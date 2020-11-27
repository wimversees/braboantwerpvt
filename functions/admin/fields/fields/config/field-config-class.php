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
    public $fieldValues   = array();
    public $fieldSettings = array();
    public $required      = false;
    public $fieldComment  = '';

    public function __construct($fieldType, $fieldSlug, $fieldLabel, $required = false, $fieldComment = '', $fieldValues = array(), $fieldSettings = array())
    {
        $this->fieldSlug     = $fieldSlug;
        $this->fieldLabel    = $fieldLabel;
        $this->fieldType     = $fieldType;
        $this->fieldValues   = $fieldValues;
        $this->fieldSettings = $fieldSettings;
        $this->required      = $required;
        $this->fieldComment  = $fieldComment;
    }
}