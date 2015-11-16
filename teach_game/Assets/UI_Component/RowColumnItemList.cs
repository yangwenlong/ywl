using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;

public class RowColumnItemList : MonoBehaviour {
	private GameObject canvas;
	public int row;
	public int column;
	public GameObject item;
	public List<GameObject> buttons = new List<GameObject>();

	// Use this for initialization
	void Start () {
		canvas  = new GameObject("canvas", typeof(Canvas));
		canvas.transform.SetParent(transform);
		canvas.AddComponent<Canvas> ();
		canvas.AddComponent<GraphicRaycaster>();
		canvas.GetComponent<Canvas> ().renderMode = RenderMode.ScreenSpaceOverlay;

		for (int i=0; i<row*column; i++) {
			GameObject b = Instantiate(item);
			b.transform.SetParent(canvas.transform);
			Vector3 parent_pos = canvas.GetComponent<RectTransform>().position;
			b.GetComponent<RectTransform>().position = new Vector3(parent_pos.x+(i/row)*100,parent_pos.y+(i%row)*100,0);
			//b.AddComponent<CanvasRenderer>();
			//b.AddComponent<Image>();
			b.GetComponent<RectTransform>().sizeDelta = new Vector2(20,20);
			buttons.Add(b);
		}
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
