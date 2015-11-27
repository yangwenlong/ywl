using UnityEngine;
using System.Collections;
using UnityEngine.UI;
using UI_ManagerNS;

public class ShowText : MonoBehaviour {

	public InputField text_obj;
	public Text txt;
	
	// Use this for initialization
	void Start () {
		guiManager.getInstance ().explaination_text = text_obj;
	}
	
	// Update is called once per frame
	void Update () {

	}
}
