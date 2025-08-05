---
title: "视频嵌入方案指南"
description: "哈基米叮咚鸡"
pubDate: "Jul 08 2142"
heroImage: "/blog-placeholder-3.jpg"
---

# 视频嵌入方案指南

## Linux ECS方案

### 实施步骤

```bash
# 连接ECS服务器
ssh username@your-ecs-ip

# 安装必要软件
sudo apt update
sudo apt install -y nginx ffmpeg
Nginx配置
nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location /video/ {
        root /var/www;
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, OPTIONS';
        mp4;
        mp4_buffer_size 1m;
    }
}
iframe嵌入代码
html
<iframe 
  src="http://your-ecs-ip/video/test.mp4"
  frameborder="0"
  allowfullscreen
  style="width: 100%; height: 500px;">
</iframe>
Windows Server方案
IIS配置步骤
安装Web服务器角色

创建C:\WebVideos目录

添加.mp4的MIME类型为video/mp4

web.config配置
xml
<configuration>
    <system.webServer>
        <httpProtocol>
            <customHeaders>
                <add name="Access-Control-Allow-Origin" value="*" />
            </customHeaders>
        </httpProtocol>
    </system.webServer>
</configuration>
PowerShell命令
powershell
New-Item -Path "C:\WebVideos" -ItemType Directory
Set-Acl -Path "C:\WebVideos" -AclObject (Get-Acl -Path "C:\WebVideos")
通用建议
必须启用HTTPS：

使用Let's Encrypt免费证书

避免混合内容警告

防盗链配置：

nginx
valid_referers none blocked your-website.com;
if ($invalid_referer) {
    return 403;
}
移动端适配：

css
.video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
    overflow: hidden;
}
故障排查表
问题现象	可能原因	解决方案
403错误	权限不足	检查文件夹权限
视频无法拖动	未启用字节服务	配置Range头支持
跨域问题	缺少CORS头	检查Access-Control-Allow-Origin
提示：建议使用HTML5 video标签作为首选方案，iframe作为备用方案。
