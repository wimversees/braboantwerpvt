<?php

// If this file is called directly, abort.
if (!defined('ABSPATH')) {
    die();
}

class FieldGroup
{
    public $fieldGroupTitle  = '';
    public $fieldGroupFields = array();

    public function __construct($fieldGroupTitle = 'Field group', $fieldGroupFields = array())
    {
        $this->fieldGroupTitle  = $fieldGroupTitle;
        $this->fieldGroupFields = $fieldGroupFields;
    }
}