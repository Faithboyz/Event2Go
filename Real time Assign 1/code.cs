using UnityEngine;
using System.Collections;

public class Schroeder : MonoBehaviour 
{
	
	[Range(0f, 1f)]
	public float myDelayVolume;
	
	[Range(0f, 1f)]
	public float g1;
	[Range(0f, 1f)]
	public float g2;
	[Range(0f, 1f)]
	public float g3;
	[Range(0f, 1f)]
	public float g4;
	[Range(0f, 1f)]
	public float g5;
	[Range(0f, 1f)]
	public float g6;
	
	[Range(0f, 1f)]
	public float c1;
	[Range(0f, 1f)]
	public float c2;
	[Range(0f, 1f)]
	public float c3;
	[Range(0f, 1f)]
	public float c4;
	
	[Range(0, 5000)]
	public int T1;
	[Range(0, 5000)]
	public int T2;
	[Range(0, 5000)]
	public int T3;
	[Range(0, 5000)]
	public int T4;
	[Range(0, 5000)]
	public int T5;
	[Range(0, 5000)]
	public int T6;
	
	//
	
	int mySampleRate;					//Sample rate van audio...
	int myDataLength;					//Length of 1 chunk of audio...
	int myBufferLength;					//Length of audio buffers...
	
	float[] X;								
	
	float[] A1;
	float[] A2;
	float[] A3;
	float[] A4;
	
	float[] B;
	
	float[] C1;
	float[] C2;
	
	float[] D1;
	float[] D2;
	
	int myN;							//Audio chunk count...
	public int myPositionInBuffer;		//Position in samples in buffer...
	
	bool myInit;						//False on first call...
	
	
	void Start()
	{
		
		//mySampleRate = audio.clip.frequency;
		
	}
	
	void OnAudioFilterRead(float[] data, int channels)
	{

		//Init buffers...
		if (!myInit) 
		{
			
			myBufferLength = 128;	
			
			//
			
			X = new float[myBufferLength];
			
			InitBuffer(X);
			
			//
			
			A1 = new float[myBufferLength];
			A2 = new float[myBufferLength];
			A3 = new float[myBufferLength];
			A4 = new float[myBufferLength];
			
			InitBuffer(A1);
			InitBuffer(A2);
			InitBuffer(A3);
			InitBuffer(A4);
			
			//
			
			B = new float[myBufferLength];
			
			InitBuffer(B);
			
			//
			
			C1 = new float[myBufferLength];
			C2 = new float[myBufferLength];
			
			InitBuffer(C1);
			InitBuffer(C2);
			
			//
			
			D1 = new float[myBufferLength];
			D2 = new float[myBufferLength];
			
			InitBuffer(D1);
			InitBuffer(D2);
			
			//
			
			myN = 0;
			
			myDataLength = data.Length;
			
			myInit = true;
			
		}
		
		
		//Buffering...
		
		myPositionInBuffer = myN * myDataLength;
		
		for (int a = 0; a < myDataLength; a++)
		{
			
			X[myPositionInBuffer + a] = data[a];
			
		}
		
		
		//4 x Comb filter...
		for (int a = 0; a < myDataLength; a++)
		{
			A1[myPositionInBuffer +  a] = (X[myPositionInBuffer +  a] + (A1[GetBufferPosition(myBufferLength, myPositionInBuffer + a, T1)] * g1) * c1);
			A2[myPositionInBuffer +  a] = (X[myPositionInBuffer +  a] + (A2[GetBufferPosition(myBufferLength, myPositionInBuffer + a, T2)] * g2) * c2);
			A3[myPositionInBuffer +  a] = (X[myPositionInBuffer +  a] + (A3[GetBufferPosition(myBufferLength, myPositionInBuffer + a, T3)] * g3) * c3);
			A4[myPositionInBuffer +  a] = (X[myPositionInBuffer +  a] + (A4[GetBufferPosition(myBufferLength, myPositionInBuffer + a, T4)] * g4) * c4);
		}

		//Sum output of comb filters...
		for (int a = 0; a < myDataLength; a++) 
		{
			
			B[myPositionInBuffer +  a] = 	A1[myPositionInBuffer +  a]+
											A2[myPositionInBuffer +  a]+
											A3[myPositionInBuffer +  a]+
											A4[myPositionInBuffer +  a];
			
		}

		//All pass filter 1...
		for (int a = 0; a < myDataLength; a++) 
		{
			
			C1[myPositionInBuffer +  a] = B[myPositionInBuffer +  a] 	+ (C1[GetBufferPosition(myBufferLength, myPositionInBuffer + a, T5)] * g5);
			
			C2[myPositionInBuffer +  a] = C1[myPositionInBuffer +  a]	- (C1[GetBufferPosition(myBufferLength, myPositionInBuffer + a, T5)] * g5); 
			
		}

		//All pass filter 2...
		for (int a = 0; a < myDataLength; a++) 
		{
			
			D1[myPositionInBuffer +  a] = C2[myPositionInBuffer +  a] 	+ (D1[GetBufferPosition(myBufferLength, myPositionInBuffer + a, T6)] * g6);
			
			D2[myPositionInBuffer +  a] = D1[myPositionInBuffer +  a]	- (D1[GetBufferPosition(myBufferLength, myPositionInBuffer + a, T6)] * g6); 
			
		}
		
		//Add reverb to data[]...
		for (int a = 0; a < myDataLength; a++)
		{
			
			data[a] += D2[myPositionInBuffer + a] * myDelayVolume;
			
		}
		
		
		//Update buffer position...
		myN = UpdatePosition(myN, myDataLength, myBufferLength);
		
	}
	
	
	//
	
	
	void InitBuffer(float[] _Buffer)
	{
		
		for (int a = 0; a < _Buffer.Length; a++)
		{
			
			_Buffer[a] = 0f; 
			
		}
		
	}
	
	int UpdatePosition(int _N, int _NSize, int _BufferLength)
	{
		
		_N++;
		
		if ((_NSize * _N) == _BufferLength)
		{
			
			return 0; 
			
		}
		
		else
		{
			
			return _N; 
			
		}
		
	}
	
	int GetBufferPosition(int _BufferSize, int _BufferPosition, int _Delay)
	{
		
		if (_BufferPosition >= _Delay)
		{
			
			return (_BufferPosition - _Delay);
			
		}
		
		else
		{
			
			return (_BufferSize - _Delay + _BufferPosition);
			
		}
		
	}
	
	int SecToSamples(float _Delay, int _SampleRate, int _Channels)
	{
		
		int _DelaySamples = (int)(_Delay * _SampleRate * _Channels);
		
		if (_Channels == 2 && _DelaySamples %2 != 0) 
		{
			
			_DelaySamples += 1;
			
		}
		
		return _DelaySamples;
		
	}
	
}
