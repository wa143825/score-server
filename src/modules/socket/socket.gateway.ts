import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";

@WebSocketGateway(80, {
	cors: {
		origin: '*'
	}
})
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

	afterInit(server: any) {
		console.log('ws服务启动成功');
	}

	handleConnection(client: any) {
		console.log(client.handshake.query.userid);
		console.log(client.id);
		console.log('ws客户端连接成功');
	}

	handleDisconnect(client: any) {
		console.log('ws客户端断开连接');
	}


	@WebSocketServer()
	server

	@SubscribeMessage('message')
	handleEvent( @MessageBody() data:string): string {
		console.log(data);
		this.server.emit('onMessage', 'aldfaj')

		return data
	}
}
