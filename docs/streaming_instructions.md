# Streaming instructions
1. Open OBS studio.
2. Go to `Settings → Stream`.
3. Set `Service` to `Custom...`, `Server` to `rtmp://<stream_container_ip>:1935/live/<stream_name>`, just like in the screenshot:
![OBS Settings](img/obs_settings.png?raw=true)
1. Done! Your stream is now available at [http://<stream_container_ip>:8080/hls/<stream_name>_{low,mid,high,hd720}.m3u8](http://<stream_container_ip>:8080/hls/<stream_name>_{low,mid,high,hd720}.m3u8).