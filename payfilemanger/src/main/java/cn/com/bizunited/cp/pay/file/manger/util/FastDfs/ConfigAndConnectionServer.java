//package cn.com.bizunited.cp.pay.file.manger.util.FastDfs;
//
//import org.csource.common.MyException;
//import org.csource.fastdfs.*;
//import org.springframework.core.io.ClassPathResource;
//
//import java.io.IOException;
//
///**
// * Created by Jay on 2017/3/29.
// */
//public  class ConfigAndConnectionServer {
//    private TrackerServer trackerServer;
//    private StorageServer storageServer;
//    private StorageClient storageClient;
//    private StorageClient1 storageClient1;
//
//
//    public TrackerServer getTrackerServer() {
//        return trackerServer;
//    }
//
//    public StorageServer getStorageServer() {
//        return storageServer;
//    }
//
//    public StorageClient getStorageClient() {
//        return storageClient;
//    }
//
//    public StorageClient1 getStorageClient1() {
//        return storageClient1;
//    }
//
//    public ConfigAndConnectionServer invoke(int flag) throws IOException, MyException {
//        /**
//         * 1.读取fastDFS客户端配置文件
//         */
//        ClassPathResource cpr = new ClassPathResource("fdfs_client.conf.properties");
//        /**
//         * 2.配置文件的初始化信息
//         */
//        ClientGlobal.init(cpr.getClassLoader().getResource("fdfs_client.conf.properties").getPath());
//        TrackerClient tracker = new TrackerClient();
//        /**
//         * 3.建立连接
//         */
//        trackerServer = tracker.getConnection();
//        storageServer = null;
//        /**
//         * 如果flag=0时候，构造StorageClient对象否则构造StorageClient1
//         */
//        if (flag == 0) {
//            storageClient = new StorageClient(trackerServer, storageServer);
//        } else {
//            storageClient1 = new StorageClient1(trackerServer, storageServer);
//        }
//        return this;
//    }
//}
