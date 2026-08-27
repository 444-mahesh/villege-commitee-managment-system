package com.vcms.village_committee_management_system.service.impl;

import com.vcms.village_committee_management_system.entity.Notice;
import com.vcms.village_committee_management_system.repository.NoticeRepository;
import com.vcms.village_committee_management_system.service.NoticeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeServiceImpl implements NoticeService {

    @Autowired
    private NoticeRepository noticeRepository;

    @Override
    public Notice saveNotice(Notice notice) {
        return noticeRepository.save(notice);
    }

    @Override
    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    @Override
    public Notice getNoticeById(Long id) {
        return noticeRepository.findById(id)
                .orElse(null);
    }

    @Override
    public void deleteNotice(Long id) {
        noticeRepository.deleteById(id);
    }
}