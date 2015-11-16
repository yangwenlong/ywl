using System;
using System.Net;
using System.Net.Sockets;
using System.Threading;
using System.Text;
using UnityEngine;
using LitJson;
using EntityNS;
// State object for receiving data from remote device.     
public class StateObject
{
	// Client socket.     
	public Socket workSocket = null;
	// Size of receive buffer.     
	public const int BufferSize = 256;
	// Receive buffer.     
	public byte[] buffer = new byte[BufferSize];
	// Received data string.     
	public StringBuilder sb = new StringBuilder();
}
public class AsynchronousClient
{
	// The port number for the remote device.     
	private const int port = 6969;
	// ManualResetEvent instances signal completion.     
	private static ManualResetEvent connectDone = new ManualResetEvent(false);
	private static ManualResetEvent sendDone = new ManualResetEvent(false);
	private static ManualResetEvent receiveDone = new ManualResetEvent(false);
	// The response from the remote device.     
	private static String response = String.Empty;

	private static Socket client;

	private static StateObject state;

	public static void StartClient()
	{
		// Connect to a remote device.     
		try
		{

			// Establish the remote endpoint for the socket.     
			// The name of the     
			// remote device is "host.contoso.com".     
			//IPHostEntry ipHostInfo = Dns.Resolve("user");
			//IPAddress ipAddress = ipHostInfo.AddressList[0];
			IPAddress ipAddress = IPAddress.Parse("127.0.0.1");
			IPEndPoint remoteEP = new IPEndPoint(ipAddress, port);
			// Create a TCP/IP socket.     
			client = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
			// Connect to the remote endpoint.   
			client.BeginConnect(remoteEP, new AsyncCallback(ConnectCallback), client);
			
			state = new StateObject();
		}
		catch (Exception e)
		{
			Console.WriteLine(e.ToString());
		}
	}
	private static void ConnectCallback(IAsyncResult ar)
	{
		try
		{
			// Retrieve the socket from the state object.     
			Socket client = (Socket)ar.AsyncState;
			// Complete the connection.     
			client.EndConnect(ar);

			Receive();
		}
		catch (Exception e)
		{
			Console.WriteLine(e.ToString());
		}
	}
	private static void Receive()
	{
		try
		{
			// Create the state object.     
			state.workSocket = client;
			// Begin receiving the data from the remote device.     
			client.BeginReceive(state.buffer, 0, StateObject.BufferSize, 0, new AsyncCallback(ReceiveCallback), state);
		}
		catch (Exception e)
		{
			Console.WriteLine(e.ToString());
		}
	}
	private static void ReceiveCallback(IAsyncResult ar)
	{
		try
		{
			// Retrieve the state object and the client socket     
			// from the asynchronous state object.     
			StateObject state = (StateObject)ar.AsyncState;
			Socket client = state.workSocket;
			// Read data from the remote device.     
			int bytesRead = client.EndReceive(ar);
			if (bytesRead > 0)
			{
				// There might be more data, so store the data received so far.     
				
				state.sb.Append(Encoding.ASCII.GetString(state.buffer, 0, bytesRead));
				// Get the rest of the data.     
				client.BeginReceive(state.buffer, 0, StateObject.BufferSize, 0, new AsyncCallback(ReceiveCallback), state);
			}
			//Debug.Log("this is receive"+state.sb);
			//ProcessPackage();
		}
		catch (Exception e)
		{
			Console.WriteLine(e.ToString());
		}
	}
	public static void Send( String data)
	{
		// Convert the string data to byte data using ASCII encoding.     
		byte[] byteData = Encoding.ASCII.GetBytes(data);
		// Begin sending the data to the remote device.     
		client.BeginSend(byteData, 0, byteData.Length, 0, new AsyncCallback(SendCallback), client);
	}
	private static void SendCallback(IAsyncResult ar)
	{
		try
		{
			// Retrieve the socket from the state object.     
			Socket client = (Socket)ar.AsyncState;
			// Complete sending the data to the remote device.     
			int bytesSent = client.EndSend(ar);
			// Signal that all bytes have been sent.     
			//sendDone.Set();
		}
		catch (Exception e)
		{
			Console.WriteLine(e.ToString());
		}
	}


	public static void ProcessPackage()
	{
		String length_str = "";
		int i = 0;
		while (state.sb.Length>0&&state.sb[i]!='{') {
			length_str += state.sb[i];
			i+=1;
		}
		try{
			int length = Convert.ToInt32 (length_str);
			String message = state.sb.ToString ().Substring(i, length);
			state.sb.Remove (0, length+i);
			if(message.Length>0)
				_process_message (message);
		}
		catch( Exception e)
		{
		}

	}
	private static void _process_message(String message)
	{
		LitJson.JsonData json = LitJson.JsonMapper.ToObject (message);
		if (json ["type"].ToString() == "__create_entity") {
			Entity ent = EntityNS.EntityFactory.getInstance ().getEntity (Convert.ToInt32(json ["id"].ToString()));

		} else if (json ["type"].ToString() == "__set__function") {
			object[] ps;

			if(json["params"].IsArray){
				ps = new object[json["params"].Count];
				for(int i=0;i<ps.Length;i++)
				{
					ps[i] = get_value(json["params"][i]);
				}
			}
			else {
				ps = new object[1];
				ps[0] = get_value(json["params"]);
				//Debug.Log("the json is params is "+ps);
			}
			EntityNS.EntityFactory.getInstance ().InvokeMethod ("EntityNS.Entity", Convert.ToInt32(json["id"].ToString()), json["function_name"].ToString(),ps);
		}
	}

	private static object get_value(JsonData v)
	{
		if(v.IsString)
			return v.ToString();
		else if(v.IsInt)
			return  Convert.ToInt32(v.ToString());
		else if(v.IsLong)
			return  Convert.ToInt64(v.ToString());
		else if(v.IsDouble)
			return  Convert.ToDouble(v.ToString());
		else if(v.IsBoolean)
			return  Convert.ToBoolean(v.ToString());
		else
			return  v.ToString();
	}
}