//package cn.com.bizunited.cp.pay.file.manger.util.FastDfs;
//
//import org.apache.commons.fileupload.disk.DiskFileItem;
//import org.apache.commons.io.IOUtils;
//import org.csource.common.NameValuePair;
//import org.csource.fastdfs.StorageClient;
//import org.csource.fastdfs.StorageClient1;
//import org.csource.fastdfs.StorageServer;
//import org.csource.fastdfs.TrackerServer;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.web.multipart.commons.CommonsMultipartFile;
//
//import javax.servlet.http.HttpServletResponse;
//import java.io.File;
//import java.io.FileInputStream;
//import java.io.IOException;
//import java.io.OutputStream;
//import java.util.HashMap;
//import java.util.Map;
//
///**
// * Created by Jay on 2017/3/29.
// */
//public class FastDFSUtil {
//    /**
//     * 远程选择上传文件-通过MultipartFile
//     * @author  Jay
//     * @param file 文件流
//     * @return Map<String,Object> code-返回代码, group-文件组, msg-文件路径/错误信息
//     */
//    public static Map<String, Object> upload(MultipartFile file) {
//        Map<String, Object> retMap = new HashMap<String, Object>();
//        TrackerServer trackerServer = null;
//        StorageServer storageServer = null;
//        try {
//            if (file.isEmpty()) {
//                retMap.put("code", "0001");
//                retMap.put("msg", "error:文件为空!");
//            } else {
//                ConfigAndConnectionServer configAndConnectionServer = new ConfigAndConnectionServer().invoke(1);
//                StorageClient1 storageClient1 = configAndConnectionServer.getStorageClient1();
//                storageServer = configAndConnectionServer.getStorageServer();
//                trackerServer = configAndConnectionServer.getTrackerServer();
//                String tempFileName = file.getOriginalFilename();
//                //设置元信息
//                NameValuePair[] metaList = new NameValuePair[3];
//                //原始文件名称
//                metaList[0] = new NameValuePair("fileName", tempFileName);
//                //文件后缀
//                byte[] fileBuff = file.getBytes();
//                String fileId = "";
//                //截取后缀
//                String fileExtName = tempFileName.substring(tempFileName.lastIndexOf(".") + 1);
//
//                metaList[1] = new NameValuePair("fileExtName", fileExtName);
//                //文件大小
//                metaList[2] = new NameValuePair("fileLength", String.valueOf(file.getSize()));
//                /**
//                 * 4.调用客户端呢的upload_file1的方法开始上传文件
//                 */
//                fileId = storageClient1.upload_file1(fileBuff, fileExtName, metaList);
//                retMap = handleResult(retMap, fileId);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            retMap.put("code", "0002");
//            retMap.put("msg", "error:文件上传失败!");
//        }finally {
//            /**
//             * 5.关闭跟踪服务器的连接
//             */
//            colse(storageServer, trackerServer);
//        }
//        return retMap;
//    }
//
//
//    /**
//     * 处理上传到文件服务器之后，返回来的结果
//     *
//     * @param retMap
//     * @param fileId
//     * @return
//     */
//    private static Map<String, Object> handleResult(Map<String, Object> retMap, String fileId) {
//        if (!fileId.equals("") && fileId != null) {
//            retMap.put("code", "0000");
//            retMap.put("group", fileId.substring(0, 6));
//            retMap.put("msg", fileId.substring(7, fileId.length()));
//        } else {
//            retMap.put("code", "0003");
//            retMap.put("msg", "error:上传失败!");
//        }
//
//        return retMap;
//    }
//
//
//
//    /**
//     * 关闭服务器
//     *
//     * @param storageServer
//     * @param trackerServer
//     */
//    public static void colse(StorageServer storageServer, TrackerServer trackerServer) {
//        if (storageServer != null && trackerServer != null) {
//            try {
//                storageServer.close();
//                trackerServer.close();
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//
//        }
//    }
//    /**
//     * 直接通过fdfs java客户端上传到服务器-读取本地文件上传
//     *
//     * @param filePath 本地文件绝对路径
//     * @return Map<String,Object> code-返回代码, group-文件组, msg-文件路径/错误信息
//     */
//    public static Map<String, Object> upload(String filePath) {
//        Map<String, Object> retMap = new HashMap<String, Object>();
//        File file = new File(filePath);
//        TrackerServer trackerServer = null;
//        StorageServer storageServer = null;
//        if (file.isFile()) {
//            try {
//                FileInputStream fis = new FileInputStream(file);
//                String tempFileName = file.getName();
//                byte[] fileBuff =IOUtils.toByteArray(fis);
//                String fileId = "";
//                //截取后缀
//                String fileExtName = tempFileName.substring(tempFileName.lastIndexOf(".") + 1);
//                ConfigAndConnectionServer configAndConnectionServer = new ConfigAndConnectionServer().invoke(1);
//                StorageClient1 storageClient1 = configAndConnectionServer.getStorageClient1();
//                storageServer = configAndConnectionServer.getStorageServer();
//                trackerServer = configAndConnectionServer.getTrackerServer();
//
//                /**
//                 * 4.设置文件的相关属性。调用客户端的upload_file1的方法上传文件
//                 */
//                NameValuePair[] metaList = new NameValuePair[3];
//                //原始文件名称
//                metaList[0] = new NameValuePair("fileName", tempFileName);
//                //文件后缀
//                metaList[1] = new NameValuePair("fileExtName", fileExtName);
//                //文件大小
//                metaList[2] = new NameValuePair("fileLength", String.valueOf(file.length()));
//                //开始上传文件
//                fileId = storageClient1.upload_file1(fileBuff, fileExtName, metaList);
//                retMap = handleResult(retMap, fileId);
//            } catch (Exception e) {
//                e.printStackTrace();
//                retMap.put("code", "0002");
//                retMap.put("msg", e.getMessage());
//            }finally {
//                /**
//                 * 5.关闭跟踪服务器的连接
//                 */
//                colse(storageServer, trackerServer);
//            }
//        } else {
//            retMap.put("code", "0001");
//            retMap.put("msg", "error:本地文件不存在!");
//        }
//        return retMap;
//    }
//
//    /**
//     * 下载文件
//     * @param response
//     * @param filepath 数据库存的文件路径
//     * @param downname 下载后的名称
//     *                 filepath M00/开头的文件路径
//     *                 group 文件所在的组 如：group0
//     * @throws IOException
//     * @author Jay
//     */
//    public static void download(HttpServletResponse response, String group, String filepath, String downname) {
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
//                response.getWriter().write("Error1 : file not Found!");
//            } else {
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
//    /**
//     * 删除文件
//     *
//     * @param group 文件分组,  filepath 已M00/ 开头的文件路径
//     * @return Map<String,Object> code-返回代码,  msg-错误信息
//     */
//    public static Map<String, Object> delete(String group, String filepath) {
//        Map<String, Object> retMap = new HashMap<String, Object>();
//        StorageServer storageServer = null;
//        TrackerServer trackerServer = null;
//        try {
//            ConfigAndConnectionServer configAndConnectionServer = new ConfigAndConnectionServer().invoke(0);
//            StorageClient storageClient = configAndConnectionServer.getStorageClient();
//            storageServer = configAndConnectionServer.getStorageServer();
//            trackerServer = configAndConnectionServer.getTrackerServer();
//            /**
//             * 4.调用客户端的delete_file方法删除文件
//             */
//            int i = storageClient.delete_file(group, filepath);
//            if (i == 0) {
//                retMap.put("code", "0000");
//                retMap.put("msg", "删除成功！");
//            } else {
//                retMap.put("code", "0001");
//                retMap.put("msg", "文件不存在!");
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            retMap.put("code", "0002");
//            retMap.put("msg", "删除失败！");
//        } finally {
//            /**
//             * 5.关闭跟踪服务器的连接
//             */
//            colse(storageServer, trackerServer);
//        }
//
//        return retMap;
//
//    }
//
//    /**
//     * MultipartFile 转换成File
//     *
//     * @param multfile 原文件类型
//     * @return File
//     * @throws IOException
//     */
//    private File multipartToFile(MultipartFile multfile) throws IOException {
//        CommonsMultipartFile cf = (CommonsMultipartFile)multfile;
//        //这个myfile是MultipartFile的
//        DiskFileItem fi = (DiskFileItem) cf.getFileItem();
//        File file = fi.getStoreLocation();
//        //手动创建临时文件
//        File tmpFile = new File(System.getProperty("java.io.tmpdir") + System.getProperty("file.separator") +
//                file.getName());
//        multfile.transferTo(tmpFile);
//        return tmpFile;
//    }
//}
