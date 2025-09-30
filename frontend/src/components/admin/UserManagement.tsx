import React, { useState, useEffect } from "react";
import { FiUser, FiSearch, FiUsers } from "react-icons/fi";
import type { UserSimpleDto } from "../../../../shared/user.types";
import { ROLES } from "../../../../shared/constants";
import Pagination from "../Pagination";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserSimpleDto[]>([]);
  const [isLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // 데모 데이터 (백엔드 구현 전)
  useEffect(() => {
    const demoUsers: UserSimpleDto[] = Array.from({ length: 25 }, (_, index) => ({
      id: index + 1,
      profileImageUrl: index % 3 === 0 ? `/uploads/images/profile/image-${index}.png` : "",
      nickname: `사용자${index + 1}`,
      role: index % 13 === 0 ? ROLES.ADMIN : index % 5 === 0 ? ROLES.SELLER : ROLES.USER,
      status: index % 7 === 0 ? "SUSPENDED" : index % 11 === 0 ? "WITHDRAWN" : "ACTIVE",
    }));
    setUsers(demoUsers);
  }, []);

  // 역할 한글 변환
  const getRoleText = (role: string) => {
    switch (role) {
      case ROLES.ADMIN:
        return "관리자";
      case ROLES.SELLER:
        return "판매자";
      default:
        return null; // USER는 null 반환
    }
  };

  // 역할 배지 색상
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case ROLES.ADMIN:
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-700";
      case ROLES.SELLER:
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-700";
      default:
        return "";
    }
  };

  // 상태 한글 변환
  const getStatusText = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "활성";
      case "SUSPENDED":
        return "정지";
      case "WITHDRAWN":
        return "탈퇴";
      default:
        return status;
    }
  };

  // 상태 배지 색상
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-700";
      case "SUSPENDED":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-700";
      case "WITHDRAWN":
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-600";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600";
    }
  };

  // 검색 필터링
  const filteredUsers = users.filter(
    (user) =>
      user.nickname?.toLowerCase().includes(searchTerm.toLowerCase()) || user.id.toString().includes(searchTerm),
  );

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const currentUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 검색어 변경 시 첫 페이지로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      {/* 헤더 섹션 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center">
            <FiUsers className="w-5 h-5 text-primary-light dark:text-primary-dark" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">회원 관리</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">총 {filteredUsers.length}명의 회원</p>
          </div>
        </div>

        {/* 검색 바 */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="닉네임 또는 ID로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#292929] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-all"
          />
        </div>
      </div>

      {/* 회원 목록 */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-light dark:border-primary-dark"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">회원 목록을 불러오는 중...</span>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-[#292929] rounded-lg border border-gray-200 dark:border-gray-600">
          <FiUsers className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">검색 결과가 없습니다</h3>
          <p className="text-gray-500 dark:text-gray-400">다른 검색어로 다시 시도해보세요.</p>
        </div>
      ) : (
        <>
          {/* 회원 리스트 그리드 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {currentUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#292929] rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:border-primary-light dark:hover:border-primary-dark transition-all duration-150 cursor-pointer shadow-sm hover:shadow-md"
                onClick={() => console.log("User clicked:", user.id)}
              >
                {/* ID */}
                <span className="text-sm font-medium text-gray-900 dark:text-white w-10">#{user.id}</span>

                {/* 프로필 이미지 */}
                <div className="flex-shrink-0">
                  {user.profileImageUrl ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL}${user.profileImageUrl}`}
                      alt={user.nickname || "프로필"}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center border-2 border-gray-200 dark:border-gray-600">
                      <FiUser className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                  )}
                </div>

                {/* 닉네임과 역할 */}
                <div className="flex-1 min-w-0 flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user.nickname || "닉네임 없음"}
                  </span>
                  {getRoleText(user.role) && (
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${getRoleBadgeColor(user.role)} flex-shrink-0`}
                    >
                      {getRoleText(user.role)}
                    </span>
                  )}
                </div>

                {/* 상태 */}
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadgeColor(user.status)}`}
                >
                  {getStatusText(user.status)}
                </span>
              </div>
            ))}
          </div>

          {/* 페이지네이션 */}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
};

export default UserManagement;
