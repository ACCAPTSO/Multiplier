package com.frieda;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.beans.*;
import java.io.Serializable;

/**
 *
 * @author frieda
 */
public class Question implements Serializable {
    
    // sure would be nice if netbeans would comment what this auto-generates
    // nonsense is about
    public static final String PROP_QUES_TEXT = "quesText";
    public static final String PROP_ORDER_INDEX = "orderIndex";
    public static final String PROP_QUES_ANS = "quesAns";
    public static final String PROP_ALT_ANS = "altAns";

    private String quesText;
    private int orderIndex;
    private String quesAns;
    private String altAns = "";
    
    private final PropertyChangeSupport propertySupport;
    
    public Question() {
        propertySupport = new PropertyChangeSupport(this);
    }
    
    public String getQuesText() {
        return quesText;
    }
    public int getOrderIndex() {
        return orderIndex;
    }
    public String getQuesAns() {
        return quesAns;
    }
    public String getAltAns() {
        return altAns;
    }
    public void setQuesText(String value) {
        String oldValue = quesText;
        quesText = value;
        propertySupport.firePropertyChange(PROP_QUES_TEXT, oldValue, quesText);
    }
    
    public void setOrderIndex( int value ) {
        int oldValue = orderIndex;
        orderIndex = value;
        propertySupport.firePropertyChange(PROP_ORDER_INDEX, oldValue, orderIndex);
    }
    public void setQuesAns(String value) {
        String oldValue = quesAns;
        quesAns = value;
        propertySupport.firePropertyChange(PROP_QUES_ANS, oldValue, quesAns);
    }
    public void setAltAns(String value) {
        String oldValue = altAns;
        altAns = value;
        propertySupport.firePropertyChange(PROP_ALT_ANS, oldValue, altAns);
    }
    public void addPropertyChangeListener(PropertyChangeListener listener) {
        propertySupport.addPropertyChangeListener(listener);
    }
    
    public void removePropertyChangeListener(PropertyChangeListener listener) {
        propertySupport.removePropertyChangeListener(listener);
    }
    
}
