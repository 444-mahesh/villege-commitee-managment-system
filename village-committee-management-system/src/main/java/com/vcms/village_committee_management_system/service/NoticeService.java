package com.vcms.village_committee_management_system.service;

import com.vcms.village_committee_management_system.entity.Notice;

import java.util.List;

public interface NoticeService {

    // Save notice
    Notice saveNotice(Notice notice);

    // Get all notices
    List<Notice> getAllNotices();

    // Get notice by id
    Notice getNoticeById(Long id);

    // Delete notice
    void deleteNotice(Long id);
}