package com.lti.testright.TO;

import java.io.File;
import java.util.List;

public class CmnEmailTO {
	
	private String toAddr;
	private String ccAddr;
	private String bccAddr;
	private String replyToAddr;
	private String fromAddr;
	private String subject;
	private String body;
	private List<File> files;
	
	
	public String getToAddr() {
		return toAddr;
	}
	public void setToAddr(String toAddr) {
		this.toAddr = toAddr;
	}
	public String getCcAddr() {
		return ccAddr;
	}
	public void setCcAddr(String ccAddr) {
		this.ccAddr = ccAddr;
	}
	public String getBccAddr() {
		return bccAddr;
	}
	public void setBccAddr(String bccAddr) {
		this.bccAddr = bccAddr;
	}
	public String getReplyToAddr() {
		return replyToAddr;
	}
	public void setReplyToAddr(String replyToAddr) {
		this.replyToAddr = replyToAddr;
	}
	public String getFromAddr() {
		return fromAddr;
	}
	public void setFromAddr(String fromAddr) {
		this.fromAddr = fromAddr;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	public List<File> getFiles() {
		return files;
	}
	public void setFiles(List<File> files) {
		this.files = files;
	}
	
	

}
