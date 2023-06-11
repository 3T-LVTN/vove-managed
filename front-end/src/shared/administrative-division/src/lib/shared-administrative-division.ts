export interface District {
  district_code: string;
  district_name: string;
  wards: Ward[];
}

export interface Ward {
  ward_code: string;
  ward_name: string;
  ward_location: {
    lat: number;
    lng: number;
  };
}

export const administrativeDivision: District[] = [
  {
    district_code: "787",
    district_name: "Huyện Cần Giờ",
    wards: [
      {
        ward_code: "27682",
        ward_name: "Xã Lý Nhơn",
        ward_location: {
          lat: 10.468149,
          lng: 106.8060388
        }
      },
      {
        ward_code: "27679",
        ward_name: "Xã Long Hòa",
        ward_location: {
          lat: 10.4630405,
          lng: 106.9004472
        }
      },
      {
        ward_code: "27676",
        ward_name: "Xã Thạnh An",
        ward_location: {
          lat: 10.5459417,
          lng: 106.9712791
        }
      },
      {
        ward_code: "27673",
        ward_name: "Xã An Thới Đông",
        ward_location: {
          lat: 10.5549722,
          lng: 106.8060388
        }
      },
      {
        ward_code: "27670",
        ward_name: "Xã Tam Thôn Hiệp",
        ward_location: {
          lat: 10.6037491,
          lng: 106.8595671
        }
      },
      {
        ward_code: "27667",
        ward_name: "Xã Bình Khánh",
        ward_location: {
          lat: 10.6431737,
          lng: 106.7824429
        }
      },
      {
        ward_code: "27664",
        ward_name: "Thị trấn Cần Thạnh",
        ward_location: {
          lat: 10.4155124,
          lng: 106.9731189
        }
      }
    ]
  },
  {
    district_code: "786",
    district_name: "Huyện Nhà Bè",
    wards: [
      {
        ward_code: "27661",
        ward_name: "Xã Hiệp Phước",
        ward_location: {
          lat: 10.6009892,
          lng: 106.7588494
        }
      },
      {
        ward_code: "27658",
        ward_name: "Xã Long Thới",
        ward_location: {
          lat: 10.6515117,
          lng: 106.7293611
        }
      },
      {
        ward_code: "27655",
        ward_name: "Xã Phú Xuân",
        ward_location: {
          lat: 10.6748507,
          lng: 106.7500025
        }
      },
      {
        ward_code: "27652",
        ward_name: "Xã Nhơn Đức",
        ward_location: {
          lat: 10.6751953,
          lng: 106.6939803
        }
      },
      {
        ward_code: "27649",
        ward_name: "Xã Phước Lộc",
        ward_location: {
          lat: 10.7001584,
          lng: 106.685136
        }
      },
      {
        ward_code: "27646",
        ward_name: "Xã Phước Kiển",
        ward_location: {
          lat: 10.70719,
          lng: 106.7057733
        }
      },
      {
        ward_code: "27643",
        ward_name: "Thị trấn Nhà Bè",
        ward_location: {
          lat: 10.6943704,
          lng: 106.7411559
        }
      }
    ]
  },
  {
    district_code: "785",
    district_name: "Huyện Bình Chánh",
    wards: [
      {
        ward_code: "27640",
        ward_name: "Xã Quy Đức",
        ward_location: {
          lat: 10.6425712,
          lng: 106.6438673
        }
      },
      {
        ward_code: "27637",
        ward_name: "Xã Bình Chánh",
        ward_location: {
          lat: 10.6630417,
          lng: 106.5672462
        }
      },
      {
        ward_code: "27634",
        ward_name: "Xã Tân Quý Tây",
        ward_location: {
          lat: 10.666887,
          lng: 106.5967126
        }
      },
      {
        ward_code: "27631",
        ward_name: "Xã Đa Phước",
        ward_location: {
          lat: 10.666245,
          lng: 106.6586052
        }
      },
      {
        ward_code: "27628",
        ward_name: "Xã Hưng Long",
        ward_location: {
          lat: 10.6681681,
          lng: 106.6232359
        }
      },
      {
        ward_code: "27625",
        ward_name: "Xã An Phú Tây",
        ward_location: {
          lat: 10.6880126,
          lng: 106.6085003
        }
      },
      {
        ward_code: "27622",
        ward_name: "Xã Phong Phú",
        ward_location: {
          lat: 10.6995307,
          lng: 106.6468148
        }
      },
      {
        ward_code: "27619",
        ward_name: "Xã Bình Hưng",
        ward_location: {
          lat: 10.7200104,
          lng: 106.6703963
        }
      },
      {
        ward_code: "27616",
        ward_name: "Xã Tân Kiên",
        ward_location: {
          lat: 10.716207,
          lng: 106.5848072
        }
      },
      {
        ward_code: "27613",
        ward_name: "Xã Tân Nhựt",
        ward_location: {
          lat: 10.7155493,
          lng: 106.5525145
        }
      },
      {
        ward_code: "27610",
        ward_name: "Xã Lê Minh Xuân",
        ward_location: {
          lat: 10.7661714,
          lng: 106.5230542
        }
      },
      {
        ward_code: "27607",
        ward_name: "Xã Bình Lợi",
        ward_location: {
          lat: 10.7756348,
          lng: 106.5096239
        }
      },
      {
        ward_code: "27604",
        ward_name: "Xã Vĩnh Lộc B",
        ward_location: {
          lat: 10.7911649,
          lng: 106.5642998
        }
      },
      {
        ward_code: "27601",
        ward_name: "Xã Vĩnh Lộc A",
        ward_location: {
          lat: 10.8238657,
          lng: 106.5642998
        }
      },
      {
        ward_code: "27598",
        ward_name: "Xã Phạm Văn Hai",
        ward_location: {
          lat: 10.8148999,
          lng: 106.528946
        }
      },
      {
        ward_code: "27595",
        ward_name: "Thị trấn Tân Túc",
        ward_location: {
          lat: 10.6844901,
          lng: 106.5731392
        }
      }
    ]
  },
  {
    district_code: "784",
    district_name: "Huyện Hóc Môn",
    wards: [
      {
        ward_code: "27592",
        ward_name: "Xã Bà Điểm",
        ward_location: {
          lat: 10.8411638,
          lng: 106.5967126
        }
      },
      {
        ward_code: "27589",
        ward_name: "Xã Xuân Thới Thượng",
        ward_location: {
          lat: 10.8565784,
          lng: 106.5642998
        }
      },
      {
        ward_code: "27586",
        ward_name: "Xã Trung Chánh",
        ward_location: {
          lat: 10.8683571,
          lng: 106.6059239
        }
      },
      {
        ward_code: "27583",
        ward_name: "Xã Xuân Thới Đông",
        ward_location: {
          lat: 10.8605277,
          lng: 106.6018314
        }
      },
      {
        ward_code: "27580",
        ward_name: "Xã Tân Xuân",
        ward_location: {
          lat: 10.8684249,
          lng: 106.5967126
        }
      },
      {
        ward_code: "27577",
        ward_name: "Xã Xuân Thới Sơn",
        ward_location: {
          lat: 10.8790427,
          lng: 106.5525145
        }
      },
      {
        ward_code: "27574",
        ward_name: "Xã Thới Tam Thôn",
        ward_location: {
          lat: 10.8976059,
          lng: 106.6114474
        }
      },
      {
        ward_code: "27571",
        ward_name: "Xã Tân Thới Nhì",
        ward_location: {
          lat: 10.8919577,
          lng: 106.5714148
        }
      },
      {
        ward_code: "27568",
        ward_name: "Xã Đông Thạnh",
        ward_location: {
          lat: 10.9065528,
          lng: 106.6468148
        }
      },
      {
        ward_code: "27565",
        ward_name: "Xã Nhị Bình",
        ward_location: {
          lat: 10.9132585,
          lng: 106.6733441
        }
      },
      {
        ward_code: "27562",
        ward_name: "Xã Tân Hiệp",
        ward_location: {
          lat: 10.9084099,
          lng: 106.5912473
        }
      },
      {
        ward_code: "27559",
        ward_name: "Thị trấn Hóc Môn",
        ward_location: {
          lat: 10.8863934,
          lng: 106.5922924
        }
      }
    ]
  },
  {
    district_code: "783",
    district_name: "Huyện Củ Chi",
    wards: [
      {
        ward_code: "27556",
        ward_name: "Xã Tân Thông Hội",
        ward_location: {
          lat: 10.9471303,
          lng: 106.50538
        }
      },
      {
        ward_code: "27553",
        ward_name: "Xã Tân Phú Trung",
        ward_location: {
          lat: 10.9389375,
          lng: 106.5411065
        }
      },
      {
        ward_code: "27550",
        ward_name: "Xã Bình Mỹ",
        ward_location: {
          lat: 10.9399403,
          lng: 106.635025
        }
      },
      {
        ward_code: "27547",
        ward_name: "Xã Tân Thạnh Đông",
        ward_location: {
          lat: 10.9586085,
          lng: 106.5937658
        }
      },
      {
        ward_code: "27544",
        ward_name: "Xã Hòa Phú",
        ward_location: {
          lat: 10.9765654,
          lng: 106.6143944
        }
      },
      {
        ward_code: "27541",
        ward_name: "Xã Tân Thạnh Tây",
        ward_location: {
          lat: 10.9875463,
          lng: 106.5642998
        }
      },
      {
        ward_code: "27538",
        ward_name: "Xã Thái Mỹ",
        ward_location: {
          lat: 10.9857505,
          lng: 106.3993658
        }
      },
      {
        ward_code: "27535",
        ward_name: "Xã Phước Vĩnh An",
        ward_location: {
          lat: 10.984377,
          lng: 106.5230542
        }
      },
      {
        ward_code: "27532",
        ward_name: "Xã Tân An Hội",
        ward_location: {
          lat: 10.9593528,
          lng: 106.4818167
        }
      },
      {
        ward_code: "27529",
        ward_name: "Xã Phước Hiệp",
        ward_location: {
          lat: 10.9831531,
          lng: 106.4464766
        }
      },
      {
        ward_code: "27526",
        ward_name: "Xã Phước Thạnh",
        ward_location: {
          lat: 11.011451,
          lng: 106.4288088
        }
      },
      {
        ward_code: "27523",
        ward_name: "Xã Trung An",
        ward_location: {
          lat: 11.0048859,
          lng: 106.5893129
        }
      },
      {
        ward_code: "27520",
        ward_name: "Xã Trung Lập Hạ",
        ward_location: {
          lat: 11.026217,
          lng: 106.458256
        }
      },
      {
        ward_code: "27517",
        ward_name: "Xã Phú Hòa Đông",
        ward_location: {
          lat: 11.0203175,
          lng: 106.5642998
        }
      },
      {
        ward_code: "27514",
        ward_name: "Xã Phạm Văn Cội",
        ward_location: {
          lat: 11.0338732,
          lng: 106.5171626
        }
      },
      {
        ward_code: "27511",
        ward_name: "Xã Nhuận Đức",
        ward_location: {
          lat: 11.0461163,
          lng: 106.493598
        }
      },
      {
        ward_code: "27508",
        ward_name: "Xã An Nhơn Tây",
        ward_location: {
          lat: 11.074436,
          lng: 106.4759262
        }
      },
      {
        ward_code: "27505",
        ward_name: "Xã Trung Lập Thượng",
        ward_location: {
          lat: 11.0603258,
          lng: 106.4346979
        }
      },
      {
        ward_code: "27502",
        ward_name: "Xã An Phú",
        ward_location: {
          lat: 11.1168711,
          lng: 106.4994889
        }
      },
      {
        ward_code: "27499",
        ward_name: "Xã Phú Mỹ Hưng",
        ward_location: {
          lat: 11.1246502,
          lng: 106.458256
        }
      },
      {
        ward_code: "27496",
        ward_name: "Thị trấn Củ Chi",
        ward_location: {
          lat: 10.972192,
          lng: 106.4965434
        }
      }
    ]
  },
  {
    district_code: "778",
    district_name: "Quận 7",
    wards: [
      {
        ward_code: "27493",
        ward_name: "Phường Phú Mỹ",
        ward_location: {
          lat: 10.7081313,
          lng: 106.7382072
        }
      },
      {
        ward_code: "27490",
        ward_name: "Phường Tân Phong",
        ward_location: {
          lat: 10.9827185,
          lng: 106.8395407
        }
      },
      {
        ward_code: "27487",
        ward_name: "Phường Tân Phú",
        ward_location: {
          lat: 10.8569656,
          lng: 106.8030892
        }
      },
      {
        ward_code: "27484",
        ward_name: "Phường Phú Thuận",
        ward_location: {
          lat: 10.7299898,
          lng: 106.7426687
        }
      },
      {
        ward_code: "27481",
        ward_name: "Phường Tân Quy",
        ward_location: {
          lat: 10.7409584,
          lng: 106.7101958
        }
      },
      {
        ward_code: "27478",
        ward_name: "Phường Bình Thuận",
        ward_location: {
          lat: 10.7417516,
          lng: 106.7205154
        }
      },
      {
        ward_code: "27475",
        ward_name: "Phường Tân Hưng",
        ward_location: {
          lat: 10.7443766,
          lng: 106.6981243
        }
      },
      {
        ward_code: "27472",
        ward_name: "Phường Tân Kiểng",
        ward_location: {
          lat: 10.7491228,
          lng: 106.7101958
        }
      },
      {
        ward_code: "27469",
        ward_name: "Phường Tân Thuận Tây",
        ward_location: {
          lat: 10.7511954,
          lng: 106.7219896
        }
      },
      {
        ward_code: "27466",
        ward_name: "Phường Tân Thuận Đông",
        ward_location: {
          lat: 10.7571056,
          lng: 106.7382072
        }
      }
    ]
  },
  {
    district_code: "777",
    district_name: "Quận Bình Tân",
    wards: [
      {
        ward_code: "27463",
        ward_name: "Phường An Lạc A",
        ward_location: {
          lat: 10.7539749,
          lng: 106.6217623
        }
      },
      {
        ward_code: "27460",
        ward_name: "Phường An Lạc",
        ward_location: {
          lat: 10.7231349,
          lng: 106.6111242
        }
      },
      {
        ward_code: "27457",
        ward_name: "Phường Tân Tạo A",
        ward_location: {
          lat: 10.7360575,
          lng: 106.5906249
        }
      },
      {
        ward_code: "27454",
        ward_name: "Phường Tân Tạo",
        ward_location: {
          lat: 10.7597516,
          lng: 106.590819
        }
      },
      {
        ward_code: "27451",
        ward_name: "Phường Bình Trị Đông B",
        ward_location: {
          lat: 10.7478932,
          lng: 106.6085003
        }
      },
      {
        ward_code: "27448",
        ward_name: "Phường Bình Trị Đông A",
        ward_location: {
          lat: 10.7703231,
          lng: 106.5967126
        }
      },
      {
        ward_code: "27445",
        ward_name: "Phường Bình Trị Đông",
        ward_location: {
          lat: 10.7639086,
          lng: 106.6143944
        }
      },
      {
        ward_code: "27442",
        ward_name: "Phường Bình Hưng Hoà B",
        ward_location: {
          lat: 10.8033353,
          lng: 106.590819
        }
      },
      {
        ward_code: "27439",
        ward_name: "Phường Bình Hưng Hoà A",
        ward_location: {
          lat: 10.7850966,
          lng: 106.6069312
        }
      },
      {
        ward_code: "27436",
        ward_name: "Phường Bình Hưng Hòa",
        ward_location: {
          lat: 10.8026884,
          lng: 106.6026064
        }
      }
    ]
  },
  {
    district_code: "776",
    district_name: "Quận 8",
    wards: [
      {
        ward_code: "27433",
        ward_name: "Phường 07",
        ward_location: {
          lat: 10.7991511,
          lng: 106.6873264
        }
      },
      {
        ward_code: "27430",
        ward_name: "Phường 16",
        ward_location: {
          lat: 10.846657,
          lng: 106.6650311
        }
      },
      {
        ward_code: "27427",
        ward_name: "Phường 15",
        ward_location: {
          lat: 10.8225398,
          lng: 106.6379724
        }
      },
      {
        ward_code: "27424",
        ward_name: "Phường 06",
        ward_location: {
          lat: 10.7775865,
          lng: 106.6916039
        }
      },
      {
        ward_code: "27421",
        ward_name: "Phường 14",
        ward_location: {
          lat: 10.8423134,
          lng: 106.6367
        }
      },
      {
        ward_code: "27418",
        ward_name: "Phường 05",
        ward_location: {
          lat: 10.810008,
          lng: 106.6896313
        }
      },
      {
        ward_code: "27415",
        ward_name: "Phường 12",
        ward_location: {
          lat: 10.7564453,
          lng: 106.6601602
        }
      },
      {
        ward_code: "27412",
        ward_name: "Phường 13",
        ward_location: {
          lat: 10.8058688,
          lng: 106.6438673
        }
      },
      {
        ward_code: "27409",
        ward_name: "Phường 04",
        ward_location: {
          lat: 10.8094793,
          lng: 106.6786709
        }
      },
      {
        ward_code: "27406",
        ward_name: "Phường 10",
        ward_location: {
          lat: 10.7826359,
          lng: 106.645341
        }
      },
      {
        ward_code: "27403",
        ward_name: "Phường 09",
        ward_location: {
          lat: 10.7587554,
          lng: 106.6711332
        }
      },
      {
        ward_code: "27400",
        ward_name: "Phường 11",
        ward_location: {
          lat: 10.4076069,
          lng: 107.130544
        }
      },
      {
        ward_code: "27397",
        ward_name: "Phường 03",
        ward_location: {
          lat: 10.8021155,
          lng: 106.6810825
        }
      },
      {
        ward_code: "27394",
        ward_name: "Phường 01",
        ward_location: {
          lat: 10.7974219,
          lng: 106.682117
        }
      },
      {
        ward_code: "27391",
        ward_name: "Phường 02",
        ward_location: {
          lat: 10.7550386,
          lng: 106.6431218
        }
      },
      {
        ward_code: "27388",
        ward_name: "Phường 08",
        ward_location: {
          lat: 10.763091,
          lng: 106.7009979
        }
      }
    ]
  },
  {
    district_code: "775",
    district_name: "Quận 6",
    wards: [
      {
        ward_code: "27385",
        ward_name: "Phường 10",
        ward_location: {
          lat: 10.7826359,
          lng: 106.645341
        }
      },
      {
        ward_code: "27382",
        ward_name: "Phường 07",
        ward_location: {
          lat: 10.7991511,
          lng: 106.6873264
        }
      },
      {
        ward_code: "27379",
        ward_name: "Phường 03",
        ward_location: {
          lat: 10.8021155,
          lng: 106.6810825
        }
      },
      {
        ward_code: "27376",
        ward_name: "Phường 08",
        ward_location: {
          lat: 10.763091,
          lng: 106.7009979
        }
      },
      {
        ward_code: "27373",
        ward_name: "Phường 04",
        ward_location: {
          lat: 10.8094793,
          lng: 106.6786709
        }
      },
      {
        ward_code: "27370",
        ward_name: "Phường 01",
        ward_location: {
          lat: 10.7974219,
          lng: 106.682117
        }
      },
      {
        ward_code: "27367",
        ward_name: "Phường 02",
        ward_location: {
          lat: 10.7550386,
          lng: 106.6431218
        }
      },
      {
        ward_code: "27364",
        ward_name: "Phường 11",
        ward_location: {
          lat: 10.4076069,
          lng: 107.130544
        }
      },
      {
        ward_code: "27361",
        ward_name: "Phường 05",
        ward_location: {
          lat: 10.810008,
          lng: 106.6896313
        }
      },
      {
        ward_code: "27358",
        ward_name: "Phường 12",
        ward_location: {
          lat: 10.7564453,
          lng: 106.6601602
        }
      },
      {
        ward_code: "27355",
        ward_name: "Phường 06",
        ward_location: {
          lat: 10.7775865,
          lng: 106.6916039
        }
      },
      {
        ward_code: "27352",
        ward_name: "Phường 09",
        ward_location: {
          lat: 10.7587554,
          lng: 106.6711332
        }
      },
      {
        ward_code: "27349",
        ward_name: "Phường 13",
        ward_location: {
          lat: 10.8058688,
          lng: 106.6438673
        }
      },
      {
        ward_code: "27346",
        ward_name: "Phường 14",
        ward_location: {
          lat: 10.8423134,
          lng: 106.6367
        }
      }
    ]
  },
  {
    district_code: "774",
    district_name: "Quận 5",
    wards: [
      {
        ward_code: "27343",
        ward_name: "Phường 13",
        ward_location: {
          lat: 10.8058688,
          lng: 106.6438673
        }
      },
      {
        ward_code: "27340",
        ward_name: "Phường 10",
        ward_location: {
          lat: 10.7826359,
          lng: 106.645341
        }
      },
      {
        ward_code: "27337",
        ward_name: "Phường 06",
        ward_location: {
          lat: 10.7775865,
          lng: 106.6916039
        }
      },
      {
        ward_code: "27334",
        ward_name: "Phường 05",
        ward_location: {
          lat: 10.810008,
          lng: 106.6896313
        }
      },
      {
        ward_code: "27331",
        ward_name: "Phường 14",
        ward_location: {
          lat: 10.8423134,
          lng: 106.6367
        }
      },
      {
        ward_code: "27328",
        ward_name: "Phường 11",
        ward_location: {
          lat: 10.7537961,
          lng: 106.6622899
        }
      },
      {
        ward_code: "27325",
        ward_name: "Phường 01",
        ward_location: {
          lat: 10.7974219,
          lng: 106.682117
        }
      },
      {
        ward_code: "27322",
        ward_name: "Phường 07",
        ward_location: {
          lat: 10.7991511,
          lng: 106.6873264
        }
      },
      {
        ward_code: "27316",
        ward_name: "Phường 08",
        ward_location: {
          lat: 10.763091,
          lng: 106.7009979
        }
      },
      {
        ward_code: "27313",
        ward_name: "Phường 02",
        ward_location: {
          lat: 10.7550386,
          lng: 106.6431218
        }
      },
      {
        ward_code: "27310",
        ward_name: "Phường 12",
        ward_location: {
          lat: 10.7564453,
          lng: 106.6601602
        }
      },
      {
        ward_code: "27307",
        ward_name: "Phường 03",
        ward_location: {
          lat: 10.8021155,
          lng: 106.6810825
        }
      },
      {
        ward_code: "27304",
        ward_name: "Phường 09",
        ward_location: {
          lat: 10.7587554,
          lng: 106.6711332
        }
      },
      {
        ward_code: "27301",
        ward_name: "Phường 04",
        ward_location: {
          lat: 10.8094793,
          lng: 106.6786709
        }
      }
    ]
  },
  {
    district_code: "773",
    district_name: "Quận 4",
    wards: [
      {
        ward_code: "27298",
        ward_name: "Phường 01",
        ward_location: {
          lat: 10.7974219,
          lng: 106.682117
        }
      },
      {
        ward_code: "27295",
        ward_name: "Phường 15",
        ward_location: {
          lat: 10.8225398,
          lng: 106.6379724
        }
      },
      {
        ward_code: "27292",
        ward_name: "Phường 02",
        ward_location: {
          lat: 10.7550386,
          lng: 106.6431218
        }
      },
      {
        ward_code: "27289",
        ward_name: "Phường 16",
        ward_location: {
          lat: 10.846657,
          lng: 106.6650311
        }
      },
      {
        ward_code: "27286",
        ward_name: "Phường 03",
        ward_location: {
          lat: 10.8021155,
          lng: 106.6810825
        }
      },
      {
        ward_code: "27283",
        ward_name: "Phường 04",
        ward_location: {
          lat: 10.8094793,
          lng: 106.6786709
        }
      },
      {
        ward_code: "27280",
        ward_name: "Phường 14",
        ward_location: {
          lat: 10.8423134,
          lng: 106.6367
        }
      },
      {
        ward_code: "27277",
        ward_name: "Phường 18",
        ward_location: {
          lat: 10.7596852,
          lng: 106.7160926
        }
      },
      {
        ward_code: "27271",
        ward_name: "Phường 10",
        ward_location: {
          lat: 10.7826359,
          lng: 106.645341
        }
      },
      {
        ward_code: "27268",
        ward_name: "Phường 08",
        ward_location: {
          lat: 10.763091,
          lng: 106.7009979
        }
      },
      {
        ward_code: "27265",
        ward_name: "Phường 06",
        ward_location: {
          lat: 10.7775865,
          lng: 106.6916039
        }
      },
      {
        ward_code: "27262",
        ward_name: "Phường 09",
        ward_location: {
          lat: 10.7587554,
          lng: 106.6711332
        }
      },
      {
        ward_code: "27259",
        ward_name: "Phường 13",
        ward_location: {
          lat: 10.8058688,
          lng: 106.6438673
        }
      }
    ]
  },
  {
    district_code: "772",
    district_name: "Quận 11",
    wards: [
      {
        ward_code: "27253",
        ward_name: "Phường 16",
        ward_location: {
          lat: 10.846657,
          lng: 106.6650311
        }
      },
      {
        ward_code: "27250",
        ward_name: "Phường 02",
        ward_location: {
          lat: 10.7550386,
          lng: 106.6431218
        }
      },
      {
        ward_code: "27247",
        ward_name: "Phường 01",
        ward_location: {
          lat: 10.7974219,
          lng: 106.682117
        }
      },
      {
        ward_code: "27244",
        ward_name: "Phường 04",
        ward_location: {
          lat: 10.8094793,
          lng: 106.6786709
        }
      },
      {
        ward_code: "27241",
        ward_name: "Phường 06",
        ward_location: {
          lat: 10.7775865,
          lng: 106.6916039
        }
      },
      {
        ward_code: "27238",
        ward_name: "Phường 07",
        ward_location: {
          lat: 10.7991511,
          lng: 106.6873264
        }
      },
      {
        ward_code: "27235",
        ward_name: "Phường 12",
        ward_location: {
          lat: 10.7564453,
          lng: 106.6601602
        }
      },
      {
        ward_code: "27232",
        ward_name: "Phường 09",
        ward_location: {
          lat: 10.7587554,
          lng: 106.6711332
        }
      },
      {
        ward_code: "27229",
        ward_name: "Phường 08",
        ward_location: {
          lat: 10.763091,
          lng: 106.7009979
        }
      },
      {
        ward_code: "27226",
        ward_name: "Phường 13",
        ward_location: {
          lat: 10.8058688,
          lng: 106.6438673
        }
      },
      {
        ward_code: "27223",
        ward_name: "Phường 10",
        ward_location: {
          lat: 10.7826359,
          lng: 106.645341
        }
      },
      {
        ward_code: "27220",
        ward_name: "Phường 03",
        ward_location: {
          lat: 10.8021155,
          lng: 106.6810825
        }
      },
      {
        ward_code: "27217",
        ward_name: "Phường 11",
        ward_location: {
          lat: 10.4076069,
          lng: 107.130544
        }
      },
      {
        ward_code: "27214",
        ward_name: "Phường 14",
        ward_location: {
          lat: 10.8423134,
          lng: 106.6367
        }
      },
      {
        ward_code: "27211",
        ward_name: "Phường 05",
        ward_location: {
          lat: 10.810008,
          lng: 106.6896313
        }
      },
      {
        ward_code: "27208",
        ward_name: "Phường 15",
        ward_location: {
          lat: 10.8225398,
          lng: 106.6379724
        }
      }
    ]
  },
  {
    district_code: "771",
    district_name: "Quận 10",
    wards: [
      {
        ward_code: "27202",
        ward_name: "Phường 06",
        ward_location: {
          lat: 10.7775865,
          lng: 106.6916039
        }
      },
      {
        ward_code: "27199",
        ward_name: "Phường 05",
        ward_location: {
          lat: 10.810008,
          lng: 106.6896313
        }
      },
      {
        ward_code: "27196",
        ward_name: "Phường 07",
        ward_location: {
          lat: 10.7991511,
          lng: 106.6873264
        }
      },
      {
        ward_code: "27193",
        ward_name: "Phường 04",
        ward_location: {
          lat: 10.8094793,
          lng: 106.6786709
        }
      },
      {
        ward_code: "27190",
        ward_name: "Phường 02",
        ward_location: {
          lat: 10.7550386,
          lng: 106.6431218
        }
      },
      {
        ward_code: "27187",
        ward_name: "Phường 08",
        ward_location: {
          lat: 10.763091,
          lng: 106.7009979
        }
      },
      {
        ward_code: "27184",
        ward_name: "Phường 01",
        ward_location: {
          lat: 10.7974219,
          lng: 106.682117
        }
      },
      {
        ward_code: "27181",
        ward_name: "Phường 09",
        ward_location: {
          lat: 10.7587554,
          lng: 106.6711332
        }
      },
      {
        ward_code: "27178",
        ward_name: "Phường 10",
        ward_location: {
          lat: 10.7826359,
          lng: 106.645341
        }
      },
      {
        ward_code: "27175",
        ward_name: "Phường 11",
        ward_location: {
          lat: 10.4076069,
          lng: 107.130544
        }
      },
      {
        ward_code: "27172",
        ward_name: "Phường 12",
        ward_location: {
          lat: 10.7564453,
          lng: 106.6601602
        }
      },
      {
        ward_code: "27169",
        ward_name: "Phường 14",
        ward_location: {
          lat: 10.8423134,
          lng: 106.6367
        }
      },
      {
        ward_code: "27166",
        ward_name: "Phường 13",
        ward_location: {
          lat: 10.8058688,
          lng: 106.6438673
        }
      },
      {
        ward_code: "27163",
        ward_name: "Phường 15",
        ward_location: {
          lat: 10.8225398,
          lng: 106.6379724
        }
      }
    ]
  },
  {
    district_code: "770",
    district_name: "Quận 3",
    wards: [
      {
        ward_code: "27160",
        ward_name: "Phường 01",
        ward_location: {
          lat: 10.7974219,
          lng: 106.682117
        }
      },
      {
        ward_code: "27157",
        ward_name: "Phường 02",
        ward_location: {
          lat: 10.7550386,
          lng: 106.6431218
        }
      },
      {
        ward_code: "27154",
        ward_name: "Phường 03",
        ward_location: {
          lat: 10.8021155,
          lng: 106.6810825
        }
      },
      {
        ward_code: "27151",
        ward_name: "Phường 05",
        ward_location: {
          lat: 10.810008,
          lng: 106.6896313
        }
      },
      {
        ward_code: "27148",
        ward_name: "Phường 04",
        ward_location: {
          lat: 10.8094793,
          lng: 106.6786709
        }
      },
      {
        ward_code: "27145",
        ward_name: "Phường 10",
        ward_location: {
          lat: 10.7826359,
          lng: 106.645341
        }
      },
      {
        ward_code: "27142",
        ward_name: "Phường 09",
        ward_location: {
          lat: 10.7587554,
          lng: 106.6711332
        }
      },
      {
        ward_code: "27139",
        ward_name: "Phường Võ Thị Sáu",
        ward_location: {
          lat: 10.7834495,
          lng: 106.6936593
        }
      },
      {
        ward_code: "27136",
        ward_name: "Phường 13",
        ward_location: {
          lat: 10.8058688,
          lng: 106.6438673
        }
      },
      {
        ward_code: "27133",
        ward_name: "Phường 11",
        ward_location: {
          lat: 10.4076069,
          lng: 107.130544
        }
      },
      {
        ward_code: "27130",
        ward_name: "Phường 12",
        ward_location: {
          lat: 10.7564453,
          lng: 106.6601602
        }
      },
      {
        ward_code: "27127",
        ward_name: "Phường 14",
        ward_location: {
          lat: 10.8423134,
          lng: 106.6367
        }
      }
    ]
  },
  {
    district_code: "769",
    district_name: "Thành phố Thủ Đức",
    wards: [
      {
        ward_code: "27118",
        ward_name: "Phường Thủ Thiêm",
        ward_location: {
          lat: 10.7732956,
          lng: 106.7160926
        }
      },
      {
        ward_code: "27115",
        ward_name: "Phường An Lợi Đông",
        ward_location: {
          lat: 10.7631993,
          lng: 106.7264125
        }
      },
      {
        ward_code: "27112",
        ward_name: "Phường Thạnh Mỹ Lợi",
        ward_location: {
          lat: 10.7583621,
          lng: 106.7647475
        }
      },
      {
        ward_code: "27109",
        ward_name: "Phường Cát Lái",
        ward_location: {
          lat: 10.7708268,
          lng: 106.7853922
        }
      },
      {
        ward_code: "27100",
        ward_name: "Phường Bình Trưng Tây",
        ward_location: {
          lat: 10.7844627,
          lng: 106.7603239
        }
      },
      {
        ward_code: "27097",
        ward_name: "Phường Bình Trưng Đông",
        ward_location: {
          lat: 10.78204,
          lng: 106.7794935
        }
      },
      {
        ward_code: "27094",
        ward_name: "Phường An Khánh",
        ward_location: {
          lat: 10.7852158,
          lng: 106.7294715
        }
      },
      {
        ward_code: "27091",
        ward_name: "Phường An Phú",
        ward_location: {
          lat: 10.8019128,
          lng: 106.7647475
        }
      },
      {
        ward_code: "27088",
        ward_name: "Phường Thảo Điền",
        ward_location: {
          lat: 10.8064331,
          lng: 106.7323097
        }
      },
      {
        ward_code: "26866",
        ward_name: "Phường Phú Hữu",
        ward_location: {
          lat: 10.7890603,
          lng: 106.8001396
        }
      },
      {
        ward_code: "26863",
        ward_name: "Phường Phước Bình",
        ward_location: {
          lat: 10.8137558,
          lng: 106.7721204
        }
      },
      {
        ward_code: "26860",
        ward_name: "Phường Long Trường",
        ward_location: {
          lat: 10.7986358,
          lng: 106.8237374
        }
      },
      {
        ward_code: "26857",
        ward_name: "Phường Long Phước",
        ward_location: {
          lat: 10.8075496,
          lng: 106.8591387
        }
      },
      {
        ward_code: "26854",
        ward_name: "Phường Trường Thạnh",
        ward_location: {
          lat: 10.8117526,
          lng: 106.8325872
        }
      },
      {
        ward_code: "26851",
        ward_name: "Phường Phước Long A",
        ward_location: {
          lat: 10.8224164,
          lng: 106.763273
        }
      },
      {
        ward_code: "26848",
        ward_name: "Phường Phước Long B",
        ward_location: {
          lat: 10.8147076,
          lng: 106.7794935
        }
      },
      {
        ward_code: "26845",
        ward_name: "Phường Tăng Nhơn Phú B",
        ward_location: {
          lat: 10.8307175,
          lng: 106.7853922
        }
      },
      {
        ward_code: "26842",
        ward_name: "Phường Tăng Nhơn Phú A",
        ward_location: {
          lat: 10.8409534,
          lng: 106.79719
        }
      },
      {
        ward_code: "26839",
        ward_name: "Phường Hiệp Phú",
        ward_location: {
          lat: 10.8486667,
          lng: 106.7809682
        }
      },
      {
        ward_code: "26836",
        ward_name: "Phường Tân Phú",
        ward_location: {
          lat: 10.8569656,
          lng: 106.8030892
        }
      },
      {
        ward_code: "26833",
        ward_name: "Phường Long Thạnh Mỹ",
        ward_location: {
          lat: 10.8421949,
          lng: 106.8237374
        }
      },
      {
        ward_code: "26830",
        ward_name: "Phường Long Bình",
        ward_location: {
          lat: 10.8909381,
          lng: 106.8283134
        }
      },
      {
        ward_code: "26827",
        ward_name: "Phường Trường Thọ",
        ward_location: {
          lat: 10.832358,
          lng: 106.7559004
        }
      },
      {
        ward_code: "26824",
        ward_name: "Phường Bình Thọ",
        ward_location: {
          lat: 10.8467644,
          lng: 106.7662221
        }
      },
      {
        ward_code: "26821",
        ward_name: "Phường Linh Đông",
        ward_location: {
          lat: 10.843909,
          lng: 106.7441048
        }
      },
      {
        ward_code: "26818",
        ward_name: "Phường Linh Tây",
        ward_location: {
          lat: 10.8560516,
          lng: 106.7535475
        }
      },
      {
        ward_code: "26815",
        ward_name: "Phường Linh Chiểu",
        ward_location: {
          lat: 10.8538209,
          lng: 106.7617984
        }
      },
      {
        ward_code: "26812",
        ward_name: "Phường Hiệp Bình Chánh",
        ward_location: {
          lat: 10.8339953,
          lng: 106.7264125
        }
      },
      {
        ward_code: "26809",
        ward_name: "Phường Hiệp Bình Phước",
        ward_location: {
          lat: 10.8455467,
          lng: 106.7146184
        }
      },
      {
        ward_code: "26806",
        ward_name: "Phường Tam Phú",
        ward_location: {
          lat: 10.8551341,
          lng: 106.7382072
        }
      },
      {
        ward_code: "26803",
        ward_name: "Phường Tam Bình",
        ward_location: {
          lat: 10.8676413,
          lng: 106.7337841
        }
      },
      {
        ward_code: "26800",
        ward_name: "Phường Linh Trung",
        ward_location: {
          lat: 10.8637312,
          lng: 106.7794935
        }
      },
      {
        ward_code: "26797",
        ward_name: "Phường Bình Chiểu",
        ward_location: {
          lat: 10.8830404,
          lng: 106.7264125
        }
      },
      {
        ward_code: "26794",
        ward_name: "Phường Linh Xuân",
        ward_location: {
          lat: 10.8804079,
          lng: 106.773595
        }
      }
    ]
  },
  {
    district_code: "768",
    district_name: "Quận Phú Nhuận",
    wards: [
      {
        ward_code: "27085",
        ward_name: "Phường 13",
        ward_location: {
          lat: 10.8058688,
          lng: 106.6438673
        }
      },
      {
        ward_code: "27076",
        ward_name: "Phường 17",
        ward_location: {
          lat: 10.8409406,
          lng: 106.6748181
        }
      },
      {
        ward_code: "27073",
        ward_name: "Phường 11",
        ward_location: {
          lat: 10.4076069,
          lng: 107.130544
        }
      },
      {
        ward_code: "27070",
        ward_name: "Phường 10",
        ward_location: {
          lat: 10.7826359,
          lng: 106.645341
        }
      },
      {
        ward_code: "27067",
        ward_name: "Phường 15",
        ward_location: {
          lat: 10.8225398,
          lng: 106.6379724
        }
      },
      {
        ward_code: "27064",
        ward_name: "Phường 08",
        ward_location: {
          lat: 10.763091,
          lng: 106.7009979
        }
      },
      {
        ward_code: "27061",
        ward_name: "Phường 02",
        ward_location: {
          lat: 10.7550386,
          lng: 106.6431218
        }
      },
      {
        ward_code: "27058",
        ward_name: "Phường 01",
        ward_location: {
          lat: 10.7974219,
          lng: 106.682117
        }
      },
      {
        ward_code: "27055",
        ward_name: "Phường 03",
        ward_location: {
          lat: 10.8021155,
          lng: 106.6810825
        }
      },
      {
        ward_code: "27052",
        ward_name: "Phường 07",
        ward_location: {
          lat: 10.7991511,
          lng: 106.6873264
        }
      },
      {
        ward_code: "27049",
        ward_name: "Phường 09",
        ward_location: {
          lat: 10.7587554,
          lng: 106.6711332
        }
      },
      {
        ward_code: "27046",
        ward_name: "Phường 05",
        ward_location: {
          lat: 10.810008,
          lng: 106.6896313
        }
      },
      {
        ward_code: "27043",
        ward_name: "Phường 04",
        ward_location: {
          lat: 10.8094793,
          lng: 106.6786709
        }
      }
    ]
  },
  {
    district_code: "767",
    district_name: "Quận Tân Phú",
    wards: [
      {
        ward_code: "27040",
        ward_name: "Phường Tân Thới Hòa",
        ward_location: {
          lat: 10.76294,
          lng: 106.6320777
        }
      },
      {
        ward_code: "27037",
        ward_name: "Phường Hiệp Tân",
        ward_location: {
          lat: 10.7727133,
          lng: 106.6276567
        }
      },
      {
        ward_code: "27034",
        ward_name: "Phường Hòa Thạnh",
        ward_location: {
          lat: 10.7783152,
          lng: 106.6372355
        }
      },
      {
        ward_code: "27031",
        ward_name: "Phường Phú Trung",
        ward_location: {
          lat: 10.7773512,
          lng: 106.6423935
        }
      },
      {
        ward_code: "27028",
        ward_name: "Phường Phú Thạnh",
        ward_location: {
          lat: 10.7785654,
          lng: 106.6317792
        }
      },
      {
        ward_code: "27025",
        ward_name: "Phường Phú Thọ Hòa",
        ward_location: {
          lat: 10.7863307,
          lng: 106.6276567
        }
      },
      {
        ward_code: "27022",
        ward_name: "Phường Tân Thành",
        ward_location: {
          lat: 10.7914545,
          lng: 106.6335513
        }
      },
      {
        ward_code: "27019",
        ward_name: "Phường Tân Quý",
        ward_location: {
          lat: 10.7409584,
          lng: 106.7101958
        }
      },
      {
        ward_code: "27016",
        ward_name: "Phường Sơn Kỳ",
        ward_location: {
          lat: 10.8060467,
          lng: 106.615868
        }
      },
      {
        ward_code: "27013",
        ward_name: "Phường Tây Thạnh",
        ward_location: {
          lat: 10.8122907,
          lng: 106.6261831
        }
      },
      {
        ward_code: "27010",
        ward_name: "Phường Tân Sơn Nhì",
        ward_location: {
          lat: 10.7997882,
          lng: 106.630604
        }
      }
    ]
  },
  {
    district_code: "766",
    district_name: "Quận Tân Bình",
    wards: [
      {
        ward_code: "27007",
        ward_name: "Phường 15",
        ward_location: {
          lat: 10.8225398,
          lng: 106.6379724
        }
      },
      {
        ward_code: "27004",
        ward_name: "Phường 14",
        ward_location: {
          lat: 10.8423134,
          lng: 106.6367
        }
      },
      {
        ward_code: "27001",
        ward_name: "Phường 09",
        ward_location: {
          lat: 10.7587554,
          lng: 106.6711332
        }
      },
      {
        ward_code: "26998",
        ward_name: "Phường 08",
        ward_location: {
          lat: 10.763091,
          lng: 106.7009979
        }
      },
      {
        ward_code: "26995",
        ward_name: "Phường 06",
        ward_location: {
          lat: 10.7775865,
          lng: 106.6916039
        }
      },
      {
        ward_code: "26992",
        ward_name: "Phường 10",
        ward_location: {
          lat: 10.7826359,
          lng: 106.645341
        }
      },
      {
        ward_code: "26989",
        ward_name: "Phường 05",
        ward_location: {
          lat: 10.810008,
          lng: 106.6896313
        }
      },
      {
        ward_code: "26986",
        ward_name: "Phường 07",
        ward_location: {
          lat: 10.7991511,
          lng: 106.6873264
        }
      },
      {
        ward_code: "26983",
        ward_name: "Phường 11",
        ward_location: {
          lat: 10.4076069,
          lng: 107.130544
        }
      },
      {
        ward_code: "26980",
        ward_name: "Phường 03",
        ward_location: {
          lat: 10.8021155,
          lng: 106.6810825
        }
      },
      {
        ward_code: "26977",
        ward_name: "Phường 01",
        ward_location: {
          lat: 10.7974219,
          lng: 106.682117
        }
      },
      {
        ward_code: "26974",
        ward_name: "Phường 13",
        ward_location: {
          lat: 10.8058688,
          lng: 106.6438673
        }
      },
      {
        ward_code: "26971",
        ward_name: "Phường 12",
        ward_location: {
          lat: 10.7564453,
          lng: 106.6601602
        }
      },
      {
        ward_code: "26968",
        ward_name: "Phường 04",
        ward_location: {
          lat: 10.8094793,
          lng: 106.6786709
        }
      },
      {
        ward_code: "26965",
        ward_name: "Phường 02",
        ward_location: {
          lat: 10.7550386,
          lng: 106.6431218
        }
      }
    ]
  },
  {
    district_code: "765",
    district_name: "Quận Bình Thạnh",
    wards: [
      {
        ward_code: "26962",
        ward_name: "Phường 28",
        ward_location: {
          lat: 10.825006,
          lng: 106.7411559
        }
      },
      {
        ward_code: "26959",
        ward_name: "Phường 19",
        ward_location: {
          lat: 10.7899564,
          lng: 106.7101958
        }
      },
      {
        ward_code: "26956",
        ward_name: "Phường 22",
        ward_location: {
          lat: 10.7921907,
          lng: 106.7190411
        }
      },
      {
        ward_code: "26953",
        ward_name: "Phường 21",
        ward_location: {
          lat: 10.7957882,
          lng: 106.7117589
        }
      },
      {
        ward_code: "26950",
        ward_name: "Phường 17",
        ward_location: {
          lat: 10.8409406,
          lng: 106.6748181
        }
      },
      {
        ward_code: "26947",
        ward_name: "Phường 03",
        ward_location: {
          lat: 10.8021155,
          lng: 106.6810825
        }
      },
      {
        ward_code: "26944",
        ward_name: "Phường 01",
        ward_location: {
          lat: 10.7974219,
          lng: 106.682117
        }
      },
      {
        ward_code: "26941",
        ward_name: "Phường 02",
        ward_location: {
          lat: 10.7550386,
          lng: 106.6431218
        }
      },
      {
        ward_code: "26938",
        ward_name: "Phường 15",
        ward_location: {
          lat: 10.8225398,
          lng: 106.6379724
        }
      },
      {
        ward_code: "26935",
        ward_name: "Phường 14",
        ward_location: {
          lat: 10.8423134,
          lng: 106.6367
        }
      },
      {
        ward_code: "26932",
        ward_name: "Phường 06",
        ward_location: {
          lat: 10.7775865,
          lng: 106.6916039
        }
      },
      {
        ward_code: "26929",
        ward_name: "Phường 24",
        ward_location: {
          lat: 10.8058993,
          lng: 106.7050362
        }
      },
      {
        ward_code: "26926",
        ward_name: "Phường 07",
        ward_location: {
          lat: 10.7991511,
          lng: 106.6873264
        }
      },
      {
        ward_code: "26923",
        ward_name: "Phường 05",
        ward_location: {
          lat: 10.810008,
          lng: 106.6896313
        }
      },
      {
        ward_code: "26920",
        ward_name: "Phường 25",
        ward_location: {
          lat: 10.8040973,
          lng: 106.7153875
        }
      },
      {
        ward_code: "26917",
        ward_name: "Phường 12",
        ward_location: {
          lat: 10.7564453,
          lng: 106.6601602
        }
      },
      {
        ward_code: "26914",
        ward_name: "Phường 26",
        ward_location: {
          lat: 10.8131851,
          lng: 106.7087216
        }
      },
      {
        ward_code: "26911",
        ward_name: "Phường 27",
        ward_location: {
          lat: 10.8166994,
          lng: 106.7190411
        }
      },
      {
        ward_code: "26908",
        ward_name: "Phường 11",
        ward_location: {
          lat: 10.4076069,
          lng: 107.130544
        }
      },
      {
        ward_code: "26905",
        ward_name: "Phường 13",
        ward_location: {
          lat: 10.8058688,
          lng: 106.6438673
        }
      }
    ]
  },
  {
    district_code: "764",
    district_name: "Quận Gò Vấp",
    wards: [
      {
        ward_code: "26902",
        ward_name: "Phường 03",
        ward_location: {
          lat: 10.8021155,
          lng: 106.6810825
        }
      },
      {
        ward_code: "26899",
        ward_name: "Phường 11",
        ward_location: {
          lat: 10.4076069,
          lng: 107.130544
        }
      },
      {
        ward_code: "26898",
        ward_name: "Phường 8",
        ward_location: {
          lat: 10.7645241,
          lng: 106.6652376
        }
      },
      {
        ward_code: "26897",
        ward_name: "Phường 9",
        ward_location: {
          lat: 10.37369,
          lng: 107.0923256
        }
      },
      {
        ward_code: "26896",
        ward_name: "Phường 01",
        ward_location: {
          lat: 10.7974219,
          lng: 106.682117
        }
      },
      {
        ward_code: "26893",
        ward_name: "Phường 04",
        ward_location: {
          lat: 10.8094793,
          lng: 106.6786709
        }
      },
      {
        ward_code: "26890",
        ward_name: "Phường 07",
        ward_location: {
          lat: 10.7991511,
          lng: 106.6873264
        }
      },
      {
        ward_code: "26887",
        ward_name: "Phường 05",
        ward_location: {
          lat: 10.810008,
          lng: 106.6896313
        }
      },
      {
        ward_code: "26884",
        ward_name: "Phường 10",
        ward_location: {
          lat: 10.7826359,
          lng: 106.645341
        }
      },
      {
        ward_code: "26882",
        ward_name: "Phường 14",
        ward_location: {
          lat: 10.8423134,
          lng: 106.6367
        }
      },
      {
        ward_code: "26881",
        ward_name: "Phường 12",
        ward_location: {
          lat: 10.7564453,
          lng: 106.6601602
        }
      },
      {
        ward_code: "26878",
        ward_name: "Phường 16",
        ward_location: {
          lat: 10.846657,
          lng: 106.6650311
        }
      },
      {
        ward_code: "26876",
        ward_name: "Phường 6",
        ward_location: {
          lat: 10.7334671,
          lng: 106.6482886
        }
      },
      {
        ward_code: "26875",
        ward_name: "Phường 17",
        ward_location: {
          lat: 10.8409406,
          lng: 106.6748181
        }
      },
      {
        ward_code: "26872",
        ward_name: "Phường 13",
        ward_location: {
          lat: 10.8058688,
          lng: 106.6438673
        }
      },
      {
        ward_code: "26869",
        ward_name: "Phường 15",
        ward_location: {
          lat: 10.8225398,
          lng: 106.6379724
        }
      }
    ]
  },
  {
    district_code: "761",
    district_name: "Quận 12",
    wards: [
      {
        ward_code: "26791",
        ward_name: "Phường Tân Thới Nhất",
        ward_location: {
          lat: 10.8292885,
          lng: 106.6143944
        }
      },
      {
        ward_code: "26788",
        ward_name: "Phường Đông Hưng Thuận",
        ward_location: {
          lat: 10.8433839,
          lng: 106.630604
        }
      },
      {
        ward_code: "26787",
        ward_name: "Phường Tân Hưng Thuận",
        ward_location: {
          lat: 10.854286,
          lng: 106.630604
        }
      },
      {
        ward_code: "26785",
        ward_name: "Phường Trung Mỹ Tây",
        ward_location: {
          lat: 10.856544,
          lng: 106.6143944
        }
      },
      {
        ward_code: "26782",
        ward_name: "Phường Tân Thới Hiệp",
        ward_location: {
          lat: 10.8603672,
          lng: 106.6438673
        }
      },
      {
        ward_code: "26779",
        ward_name: "Phường An Phú Đông",
        ward_location: {
          lat: 10.8596614,
          lng: 106.7057733
        }
      },
      {
        ward_code: "26776",
        ward_name: "Phường Tân Chánh Hiệp",
        ward_location: {
          lat: 10.866797,
          lng: 106.6261831
        }
      },
      {
        ward_code: "26773",
        ward_name: "Phường Thới An",
        ward_location: {
          lat: 10.8760697,
          lng: 106.6556575
        }
      },
      {
        ward_code: "26770",
        ward_name: "Phường Hiệp Thành",
        ward_location: {
          lat: 10.8825023,
          lng: 106.6379724
        }
      },
      {
        ward_code: "26767",
        ward_name: "Phường Thạnh Lộc",
        ward_location: {
          lat: 10.8712302,
          lng: 106.6859815
        }
      },
      {
        ward_code: "26764",
        ward_name: "Phường Thạnh Xuân",
        ward_location: {
          lat: 10.8834303,
          lng: 106.6703963
        }
      }
    ]
  },
  {
    district_code: "760",
    district_name: "Quận 1",
    wards: [
      {
        ward_code: "26761",
        ward_name: "Phường Cầu Kho",
        ward_location: {
          lat: 10.7577834,
          lng: 106.6888211
        }
      },
      {
        ward_code: "26758",
        ward_name: "Phường Nguyễn Cư Trinh",
        ward_location: {
          lat: 10.7640301,
          lng: 106.68661
        }
      },
      {
        ward_code: "26755",
        ward_name: "Phường Cô Giang",
        ward_location: {
          lat: 10.7616235,
          lng: 106.6932433
        }
      },
      {
        ward_code: "26752",
        ward_name: "Phường Cầu Ông Lãnh",
        ward_location: {
          lat: 10.7655446,
          lng: 106.6961914
        }
      },
      {
        ward_code: "26749",
        ward_name: "Phường Phạm Ngũ Lão",
        ward_location: {
          lat: 10.7658855,
          lng: 106.6908105
        }
      },
      {
        ward_code: "26746",
        ward_name: "Phường Nguyễn Thái Bình",
        ward_location: {
          lat: 10.7693846,
          lng: 106.7006138
        }
      },
      {
        ward_code: "26743",
        ward_name: "Phường Bến Thành",
        ward_location: {
          lat: 10.7735994,
          lng: 106.6944173
        }
      },
      {
        ward_code: "26740",
        ward_name: "Phường Bến Nghé",
        ward_location: {
          lat: 10.7808334,
          lng: 106.702825
        }
      },
      {
        ward_code: "26737",
        ward_name: "Phường Đa Kao",
        ward_location: {
          lat: 10.7878843,
          lng: 106.6984026
        }
      },
      {
        ward_code: "26734",
        ward_name: "Phường Tân Định",
        ward_location: {
          lat: 10.7930968,
          lng: 106.6902951
        }
      }
    ]
  }
]


export const getDistricts = () => {
  return administrativeDivision.map((val) => {
    return {
      ...val,
      wards: val.wards.map((ele) => {
        return { lat: ele.ward_location.lat, lng: ele.ward_location.lng, locationCode: ele.ward_code };
      }),
    };
  });
};

export const getWards = (districtCode: string) => {
  const district = administrativeDivision.find(
    (district) => district.district_code === districtCode
  );
  if (!district) throw new Error('District not found');
  return district.wards.map((ward,index) => ({
    idx: index,
    code: ward.ward_code,
    name: ward.ward_name,
    lat: ward.ward_location.lat,
    lng: ward.ward_location.lng,
    locationCode: ward.ward_code,
  }));
};

export const getWard = (districtName: string, wardName: string) => {
  const wards = getWards(districtName);
  const ward = wards.find((ward) => ward.name === wardName);
  if (!ward) throw new Error('Ward not found');
  return {
    ...ward,
    locationCode: ward.name,
  };
};


export  const getRate= (value: string) =>  {
  switch (value) {
    case "LOW_RISK":
      return "Nguy cơ thấp"
    case "HIGH_RISK":
      return "Nguy cơ cao"
    case "NORMAL":
      return "Bình thường"
    case "SAFE":
      return "An toàn"
    default:
      return "";
  }
}
