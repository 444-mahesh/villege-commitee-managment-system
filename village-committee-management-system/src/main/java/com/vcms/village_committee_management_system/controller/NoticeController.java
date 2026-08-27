package com.vcms.village_committee_management_system.controller;

import com.vcms.village_committee_management_system.entity.Notice;
import com.vcms.village_committee_management_system.service.NoticeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notices")
@CrossOrigin("*")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    // Create Notice
    @PostMapping
    public Notice saveNotice(@RequestBody Notice notice) {
        return noticeService.saveNotice(notice);
    }

    // Get All Notices
    @GetMapping
    public List<Notice> getAllNotices() {
        return noticeService.getAllNotices();
    }

    // Get Notice By Id
    @GetMapping("/{id}")
    public Notice getNoticeById(@PathVariable Long id) {
        return noticeService.getNoticeById(id);
    }

    // Update Notice
    @PutMapping("/{id}")
    public Notice updateNotice(
            @PathVariable Long id,
            @RequestBody Notice notice) {

        Notice existingNotice =
                noticeService.getNoticeById(id);

        if (existingNotice == null) {
            return null;
        }

        existingNotice.setTitle(
                notice.getTitle()
        );

        existingNotice.setMessage(
                notice.getMessage()
        );

        existingNotice.setPostedBy(
                notice.getPostedBy()
        );

        existingNotice.setCreatedDate(
                notice.getCreatedDate()
        );

        return noticeService.saveNotice(existingNotice);
    }

    // Delete Notice
    @DeleteMapping("/{id}")
    public String deleteNotice(@PathVariable Long id) {

        noticeService.deleteNotice(id);

        return "Notice deleted successfully";
    }
}