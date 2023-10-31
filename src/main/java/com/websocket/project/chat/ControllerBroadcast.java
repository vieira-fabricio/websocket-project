package com.websocket.project.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControllerBroadcast {
	
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;

	@MessageMapping("/news")
	public void broadcastNews(@Payload String message) {
		
		this.simpMessagingTemplate.convertAndSend("/topic/news", message);
	}

}
