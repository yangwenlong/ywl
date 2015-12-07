using UnityEngine;
using System.Collections;

public class test_rotate : MonoBehaviour {
    private float x;
    private float y;
	// Use this for initialization
	void Start () {
        x = this.transform.position.x;
        y = this.transform.position.y;
	}
	
	// Update is called once per frame
	void Update () {
        SpriteRenderer sr = GetComponent<SpriteRenderer>();
        Sprite sprite = sr.sprite;
        Debug.Log(sprite.bounds.min+",...."+sprite.bounds.max);

        //绕左边
        //this.transform.RotateAround(new Vector3(x-(sprite.bounds.size.x/2.0f),y,0f),new Vector3(0,1,0),1);
        //绕右边
        //this.transform.RotateAround(new Vector3(x+sprite.bounds.size.x/2, y, 0), new Vector3(0, 1, 0), 1);
        //绕上边
        //this.transform.RotateAround(new Vector3(x , y+sprite.bounds.size.y/2, 0), new Vector3(1, 0, 0), 1);
        //绕下边
        //this.transform.RotateAround(new Vector3(x , y - sprite.bounds.size.y/2, 0), new Vector3(1, 0, 0), 1);

        //绕中间
        //this.transform.RotateAround(new Vector3(x, y , 0), new Vector3(1, 0, 0), 1);
        //this.transform.RotateAround(new Vector3(x, y, 0), new Vector3(0, 1, 0), 1);
        //this.transform.RotateAround(new Vector3(x, y, 0), new Vector3(0, 0, 1), 1);

        //绕左上边点
        //this.transform.RotateAround(new Vector3(x - (sprite.bounds.size.x / 2.0f), y+sprite.bounds.size.y/2, 0f), new Vector3(0, 0, 1), 1);
        //绕左下边点
        //this.transform.RotateAround(new Vector3(x - (sprite.bounds.size.x / 2.0f), y - sprite.bounds.size.y / 2, 0f), new Vector3(0, 0, 1), 1);
        //绕右上边点
        //this.transform.RotateAround(new Vector3(x+(sprite.bounds.size.x / 2.0f), y + sprite.bounds.size.y / 2, 0f), new Vector3(0, 0, 1), 1);
        //绕右下边点
        this.transform.RotateAround(new Vector3(x + (sprite.bounds.size.x / 2.0f), y - sprite.bounds.size.y / 2, 0f), new Vector3(0, 0, 1), 1);
    }
}
