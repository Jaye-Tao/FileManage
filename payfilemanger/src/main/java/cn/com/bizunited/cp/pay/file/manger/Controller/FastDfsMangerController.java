//package cn.com.bizunited.cp.pay.file.manger.Controller;
//
//import cn.com.bizunited.cp.pay.file.manger.util.FastDfs.ConfigAndConnectionServer;
//import cn.com.bizunited.cp.pay.file.manger.util.FastDfs.FastDFSUtil;
//import org.csource.fastdfs.StorageClient;
//import org.csource.fastdfs.StorageServer;
//import org.csource.fastdfs.TrackerServer;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.multipart.commons.CommonsMultipartFile;
//import org.springframework.web.servlet.ModelAndView;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.io.OutputStream;
//import java.util.Map;
//
//
///**
// * Created by Jay on 2017/3/22.
// */
//@Controller
//public class FastDfsMangerController {
//
//
//    private final static Logger logger = LoggerFactory.getLogger(FastDfsMangerController.class);
//
//
//    @RequestMapping("/upload")
//    public ModelAndView addUser(@RequestParam("fileName") CommonsMultipartFile[] files,
//                                HttpServletRequest request, HttpServletResponse response){
//        ModelAndView mv=new ModelAndView("success");
//        for(int i = 0;i<files.length;i++){
//            Map<String, Object> retMap = FastDFSUtil.upload(files[i]);
//            String code = (String) retMap.get("code");
//            String group = (String) retMap.get("group");
//            String msg = (String) retMap.get("msg");
//
//            if ("0000".equals(code)){
//                logger.info("文件上传成功");
//                //TODO:将上传文件的路径保存到mysql数据库
//            }else {
//                logger.info("文件上传失败");
//            }
//            mv.addObject("group",group);
//            mv.addObject("msg",msg);
//        }
//        return mv;
//    }
//    /**
//     * 下载文件
//     * @param response
//     * @param downname 下载后的名称
//     *                 filepath M00/开头的文件路径
//     *                 group 文件所在的组 如：group0
//     * @throws IOException
//     * author Jay
//     */
//    @RequestMapping("/down")
//    public static void download(HttpServletResponse response, String group,String downname) {
//        StorageServer storageServer = null;
//        TrackerServer trackerServer = null;
//        try {
//            ConfigAndConnectionServer configAndConnectionServer = new ConfigAndConnectionServer().invoke(0);
//            StorageClient storageClient = configAndConnectionServer.getStorageClient();
//            storageServer = configAndConnectionServer.getStorageServer();
//            trackerServer = configAndConnectionServer.getTrackerServer();
//
//            /**
//             *4.调用客户端的下载download_file的方法
//             */
//            byte[] b = storageClient.download_file(group, downname);
//            if (b == null) {
//                logger.error("Error1 : file not Found!");
//                response.getWriter().write("Error1 : file not Found!");
//            } else {
//                logger.info("下载文件..");
//                downname = new String(downname.getBytes("utf-8"), "ISO8859-1");
//                response.setHeader("Content-Disposition", "attachment;fileName=" + downname);
//                OutputStream out = response.getOutputStream();
//                out.write(b);
//                out.close();
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            try {
//                response.getWriter().write("Error1 : file not Found!");
//            } catch (IOException e1) {
//                e1.printStackTrace();
//            }
//        }finally {
//            /**
//             * 5.关闭跟踪服务器的连接
//             */
//            FastDFSUtil.colse(storageServer, trackerServer);
//        }
//    }
//
//    @RequestMapping("/delet")
//    @ResponseBody
//    public String deletFile(String group,String deletname){
//        String mes="";
//        Map<String, Object> map= FastDFSUtil.delete(group,deletname);
//        if( map.get("code").equals("0000")){
//            mes="删除成功";
//        }else if (map.get("code").equals("0001")){
//            mes="文件不存在";
//        }else if (map.get("code").equals("0002")){
//            mes="删除失败";
//        }
//        return mes;
//    }
//
//}
