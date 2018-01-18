/**
 * ZFI_ZXFY_7001_serviceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package cn.com.bizunited.cp.pay.file.manger.webservice;

public class ZFI_ZXFY_7001_serviceLocator extends org.apache.axis.client.Service implements cn.com.bizunited.cp.pay.file.manger.webservice.ZFI_ZXFY_7001_service {

    public ZFI_ZXFY_7001_serviceLocator() {
    }


    public ZFI_ZXFY_7001_serviceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public ZFI_ZXFY_7001_serviceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for ZFI_ZXFY_7001_binding
    private java.lang.String ZFI_ZXFY_7001_binding_address = "http://SJERPDV.CHINAYANGHE.COM:8000/sap/bc/srt/rfc/sap/zfi_zxfy_7001/130/zfi_zxfy_7001_service/zfi_zxfy_7001_binding";

    public java.lang.String getZFI_ZXFY_7001_bindingAddress() {
        return ZFI_ZXFY_7001_binding_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String ZFI_ZXFY_7001_bindingWSDDServiceName = "ZFI_ZXFY_7001_binding";

    public java.lang.String getZFI_ZXFY_7001_bindingWSDDServiceName() {
        return ZFI_ZXFY_7001_bindingWSDDServiceName;
    }

    public void setZFI_ZXFY_7001_bindingWSDDServiceName(java.lang.String name) {
        ZFI_ZXFY_7001_bindingWSDDServiceName = name;
    }

    public cn.com.bizunited.cp.pay.file.manger.webservice.ZFI_ZXFY_7001 getZFI_ZXFY_7001_binding() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(ZFI_ZXFY_7001_binding_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getZFI_ZXFY_7001_binding(endpoint);
    }

    public cn.com.bizunited.cp.pay.file.manger.webservice.ZFI_ZXFY_7001 getZFI_ZXFY_7001_binding(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            cn.com.bizunited.cp.pay.file.manger.webservice.ZFI_ZXFY_7001_bindingStub _stub = new cn.com.bizunited.cp.pay.file.manger.webservice.ZFI_ZXFY_7001_bindingStub(portAddress, this);
            _stub.setPortName(getZFI_ZXFY_7001_bindingWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setZFI_ZXFY_7001_bindingEndpointAddress(java.lang.String address) {
        ZFI_ZXFY_7001_binding_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (cn.com.bizunited.cp.pay.file.manger.webservice.ZFI_ZXFY_7001.class.isAssignableFrom(serviceEndpointInterface)) {
                cn.com.bizunited.cp.pay.file.manger.webservice.ZFI_ZXFY_7001_bindingStub _stub = new cn.com.bizunited.cp.pay.file.manger.webservice.ZFI_ZXFY_7001_bindingStub(new java.net.URL(ZFI_ZXFY_7001_binding_address), this);
                _stub.setPortName(getZFI_ZXFY_7001_bindingWSDDServiceName());
                return _stub;
            }
        }
        catch (java.lang.Throwable t) {
            throw new javax.xml.rpc.ServiceException(t);
        }
        throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  " + (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(javax.xml.namespace.QName portName, Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        if (portName == null) {
            return getPort(serviceEndpointInterface);
        }
        java.lang.String inputPortName = portName.getLocalPart();
        if ("ZFI_ZXFY_7001_binding".equals(inputPortName)) {
            return getZFI_ZXFY_7001_binding();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("urn:sap-com:document:sap:soap:functions:mc-style", "ZFI_ZXFY_7001_service");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("urn:sap-com:document:sap:soap:functions:mc-style", "ZFI_ZXFY_7001_binding"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("ZFI_ZXFY_7001_binding".equals(portName)) {
            setZFI_ZXFY_7001_bindingEndpointAddress(address);
        }
        else 
{ // Unknown Port Name
            throw new javax.xml.rpc.ServiceException(" Cannot set Endpoint Address for Unknown Port" + portName);
        }
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(javax.xml.namespace.QName portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        setEndpointAddress(portName.getLocalPart(), address);
    }

}
