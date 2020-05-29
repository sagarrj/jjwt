package com.lti.testright.controller;

 

import java.io.File;
import java.util.Arrays;
import java.util.Optional;

 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

 

import com.lti.testright.TO.CmnEmailTO;
import com.lti.testright.service.CmnEmailService;

 

@Controller
public class CmnMailController {
    
    @Autowired
    CmnEmailService cmnEmailService;
    
    @RequestMapping(value = "/sendMail", method = RequestMethod.GET )
    public @ResponseBody String sendMail(@RequestParam(required=false, name="to") String  toAddr){
        
        String to = Optional.ofNullable(toAddr).orElse("f0bf7189.lntinfotech.onmicrosoft.com@apac.teams.ms");
        CmnEmailTO mail = new CmnEmailTO();
        mail.setToAddr(to);
        String path = "D:\\Sagar\\sampleAttachment.txt";
        
        File file = new File(path);
        mail.setFiles(Arrays.asList(file));
    
        
        return cmnEmailService.sendMail(mail);
       
    }

 

}
 ======================
 package com.lti.testright.service;

 

import java.io.File;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.util.List;
import java.util.Optional;
import java.util.Properties;

 

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

 

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

 

import com.lti.testright.TO.CmnEmailTO;
import com.lti.testright.utils.ProxyUtil;

 

@Service
public class CmnEmailService 
{
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Value("${smtp.username}")
    private String fromAddress;
    
    
    public static void main(String args[]){
         
         
         System.out.println("MAin Started");
         JavaMailSenderImpl mailsender2 = new JavaMailSenderImpl();
         Properties javaMailProperties = new Properties();
         javaMailProperties.setProperty("mail.transport.protocol","smtp");
         javaMailProperties.setProperty("mail.tls","false");
         javaMailProperties.setProperty("mail.smtp.auth","false");
         javaMailProperties.setProperty("mail.smtp.starttls.enable","true");
         javaMailProperties.setProperty("mail.smtp.ssl.trust","smtp.office365.com");
         
         
         
         mailsender2.setHost("smtp.office365.com");
         mailsender2.setPort(587);
         mailsender2.setUsername("sagar.jaisinghani@lntinfotech.com");
         mailsender2.setPassword("Unique@123");
         //mailsender2.setJavaMailProperties(javaMailProperties);
         
         try{
             MimeMessage message = mailsender2.createMimeMessage();
              
                MimeMessageHelper helper = new MimeMessageHelper(message, true);
                 
                helper.setTo("f0bf7189.lntinfotech.onmicrosoft.com@apac.teams.ms");
                helper.setSubject("Sample Test email");
                helper.setText("PFA Attachment");
                helper.setFrom("sagar.jaisinghani@lntinfotech.com");
                
              
               
              /*  FileSystemResource file 
                  = new FileSystemResource(cmnEmailTO.getFiles().get(0));
                helper.addAttachment("Sample", file);*/

 

                setMyProxy();
                mailsender2.send(message);
                
                System.out.println("Sent");
                
                //return "Success: Mail sent." ;
            }catch (Exception e){
                System.out.println(e.getMessage());
                //return "Failed: " + e.getMessage();
            }
    }
         
     

 


    public String sendMail(CmnEmailTO cmnEmailTO){
        
         try{
             MimeMessage message = mailSender.createMimeMessage();
              
                MimeMessageHelper helper = new MimeMessageHelper(message, true);
                 
                helper.setTo(cmnEmailTO.getToAddr());
                helper.setSubject("Sample Test email");
                helper.setText("PFA Attachment");
                helper.setFrom(fromAddress);
                
              
               
                FileSystemResource file 
                  = new FileSystemResource(cmnEmailTO.getFiles().get(0));
                helper.addAttachment("Sample", file);

 

                setMyProxy();
                mailSender.send(message);
                
                return "Success: Mail sent." ;
            }catch (Exception e){
                System.out.println(e.getStackTrace());
                return "Failed: " + e.getMessage();
            }
    }
    

    =================================
    [21:09] Sagar Jaisinghani
    <!-- Mail service configuration-->
    <beans:bean id="mailSender" class="org.springframework.mail.javamail.JavaMailSenderImpl">
       <beans:property name="host" value="${smtp.host}"/>
       <beans:property name="port" value="${smtp.port}"/>
       <beans:property name="username" value="${smtp.username}"/>
       <beans:property name="password" value="${smtp.password}"/>
       <beans:property name="javaMailProperties">
              <beans:props>
                  <beans:prop key="mail.transport.protocol">${smtp.protocol}</beans:prop>
                  <beans:prop key="mail.tls">${smtp.tls}</beans:prop>
                <beans:prop key="mail.smtp.auth">${smtp.auth}</beans:prop>
                <beans:prop key="mail.smtp.starttls.enable">${smtp.starttls}</beans:prop>
                <beans:prop key="mail.smtp.ssl.trust">${smtp.host}</beans:prop>
               
<!--                 <beans:prop key="mail.debug">true</beans:prop> -->
                
              <!-- <beans:prop key="mail.transport.protocol">smtp</beans:prop>
              <beans:prop key="mail.smtp.ssl.trust">smtp.office365.com</beans:prop>
                 <beans:prop key="mail.smtp.auth">true</beans:prop>
                 <beans:prop key="mail.smtp.starttls.enable">true</beans:prop>
                 <beans:prop key="mail.debug">true</beans:prop> -->
                
                
                 <!--<beans:prop key="mail.smtp.localhost">127.0.0.1</beans:prop>-->
              </beans:props>
           </beans:property>
    </beans:bean>
<https://teams.microsoft.com/l/message/19:6763a74fdd094339a395d61a8eb9d51d@thread.tacv2/1590766784358?tenantId=02aa9fc1-18bc-4798-a020-e01c854dd434&amp;groupId=d62958b9-bec5-4654-bc9b-8e8c0224d3b5&amp;parentMessageId=1590766784358&amp;teamName=sample api team&amp;channelName=General&amp;createdTime=1590766784358>

=================================
<context:property-placeholder location="classpath:db.properties, classpath:resources.properties,classpath:token.properties,classpath:agentconfig.properties,
     classpath:authentication-add.properties, classpath:common.properties" />



================================================


#Outlook mail config properties
smtp.host=smtp.office365.com
smtp.port=587
smtp.username=sagar.jaisinghani@lntinfotech.com
smtp.password=Unique@123

smtp.protocol=smtp
smtp.tls=true
smtp.auth=true
smtp.starttls=true