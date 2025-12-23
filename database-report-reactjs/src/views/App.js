import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS cho toastify
import Navbar from "./Navbar";
import Build from "./componentBuild/Build";
import BuildEdit from "./componentBuild/componentEdit/BuildEdit";
import GRPC from "./componentGrpc/GRPC";
import LookupGRPCProfile from "./componentGrpc/componentLookupGrpcProfile/componentLookupGRPCProfile";
import Kafka from "./componentKafka/Kafka";
import KafkaTopicLookUp from "./componentKafka/componentLookUpKafkaTopic/KafkaTopicLookUp";
import ScriptDatabase from "./componentScript/ScriptDatabase";
import StoreFuncDetail from "./componentScript/componentStoreFuncDetail/StoreFuncDetail";
import TableNameDetail from "./componentScript/componentTableDetail/TableNameDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Navbar></Navbar>
          <Routes>
            <Route path="/build" element={<Build />} />
            <Route path="/build/:id" element={<BuildEdit />} />

            <Route path="/kafka" element={<Kafka />} />
            <Route path="/kafka-search" element={<KafkaTopicLookUp />} />

            <Route path="/grpc" element={<GRPC />} />
            <Route path="/grpc-search" element={<LookupGRPCProfile />} />

            <Route path="/script-database" element={<ScriptDatabase />} />
            <Route
              path="/store-func-detail/:id"
              element={<StoreFuncDetail />}
            />
            <Route path="/table-detail/:id" element={<TableNameDetail />} />
            {/* Thêm route mặc định */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer
        position="bottom-left" // Vị trí hiển thị
        autoClose={3000} // Tự động đóng sau 5 giây
        hideProgressBar={false} // Hiển thị thanh tiến trình
        newestOnTop={true} // Thông báo mới nhất ở trên cùng
        closeOnClick // Đóng khi click vào thông báo
        rtl={false} // Không dùng ngôn ngữ RTL
        pauseOnFocusLoss={false} // Không tạm dừng khi mất tiêu điểm
        draggable={false} // Vô hiệu hóa kéo để cố định thông báo
        pauseOnHover // Tạm dừng khi hover chuột
        theme="light" // Sử dụng giao diện sáng
        toastStyle={{
          backgroundColor: "#f9f9f9", // Nền sáng
          color: "#333", // Chữ tối
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Hiệu ứng đổ bóng nhẹ
          borderRadius: "8px", // Bo trn góc
          padding: "12px", // Khoảng cách bên trong lớn hơn
          fontSize: "14px", // Cỡ chữ vừa phải
          border: "1px solid #ddd", // Viền nhẹ để phân biệt
        }}
        progressStyle={{
          background: "linear-gradient(90deg, #4caf50, #ff9800)", // Hiệu ứng gradient cho thanh tiến trình
        }}
      />
    </>
  );
}

export default App;
