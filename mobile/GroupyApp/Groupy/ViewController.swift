//
//  ViewController.swift
//  Groupy
//
//  Created by ksh7534 on 2016. 6. 6..
//  Copyright © 2016년 DB. All rights reserved.
//

import UIKit

class ViewController: UIViewController, UIWebViewDelegate {

    var token = ""
    
    @IBOutlet var webView: UIWebView!
    override func viewDidLoad() {
        super.viewDidLoad()
        
        //Get Device Token
        var deviceToken = NSUserDefaults.standardUserDefaults().objectForKey("deviceToken")
        while (deviceToken==nil) {
            deviceToken = NSUserDefaults.standardUserDefaults().objectForKey("deviceToken")
        }
        let deviceTokenNSData = NSUserDefaults.standardUserDefaults().objectForKey("deviceToken") as! NSData
        token = deviceTokenNSData.hexString
        print("DEVICE TOKEN in ViewController = \(token)")
        
        let url = NSURL (string: "http://groupy.blueberry.ml")
        let requestObj = NSURLRequest(URL: url!)
        webView.loadRequest(requestObj)
        webView?.delegate = self
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    func webView(webView: UIWebView, shouldStartLoadWithRequest request: NSURLRequest, navigationType: UIWebViewNavigationType) -> Bool {
        if let url = request.URL {
            if url.absoluteString.rangeOfString("groupy.blueberry.ml") != nil {
                if url.absoluteString.rangeOfString("facebook") == nil {
                    if url.absoluteString.rangeOfString(token) != nil {
                        print("Connecting to \(url.absoluteString)")
                        return true
                    }
                    else {
                        let newURL = NSURL(string: url.absoluteString + "ios/" + token)
                        let newRequestObj = NSURLRequest(URL: newURL!)
                        print("Connecting to \(newRequestObj.URL?.absoluteString)")
                        webView.loadRequest(newRequestObj)
                        return false
                    }
                }
            }
        }
        print("Connecting to \(request.URL!.absoluteString)")
        return true
    }

}

