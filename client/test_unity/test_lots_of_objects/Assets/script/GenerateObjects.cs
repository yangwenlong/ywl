using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class GenerateObjects : MonoBehaviour {

    public GameObject wolf_prefab;
    private List<GameObject> wolfs = new List<GameObject>();
	// Use this for initialization
	void Start () {
        for(int i=0;i<1000;i++)
        {
            GameObject newObject = Instantiate(wolf_prefab) as GameObject;
            newObject.transform.position = new Vector3(Random.Range(-100, 100), 0, Random.Range(-100, 100));
            wolfs.Add(newObject);
        }
        
    }
	
	// Update is called once per frame
	void Update () {
		/*
	    for(int i=0;i<wolfs.Count;i++)
        {
            wolfs[i].transform.position += new Vector3(-0.1f, 0, 0);
        }
        */
	}
}
