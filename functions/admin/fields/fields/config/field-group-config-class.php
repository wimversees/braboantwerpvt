<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

class FieldGroup
{
    public $fieldGroupTitle   = '';
    public $fieldGroupFields  = array();
    public $fieldGroupEnabled = true;

    public function __construct($fieldGroupTitle = 'Field group', $fieldGroupFields = array(), $fieldGroupEnabled = true)
    {
        $this->fieldGroupTitle   = $fieldGroupTitle;
        $this->fieldGroupFields  = $fieldGroupFields;
        $this->fieldGroupEnabled = $fieldGroupEnabled;
    }
}