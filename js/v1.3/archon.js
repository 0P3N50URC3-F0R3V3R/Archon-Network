var DEV = false;
var DATA = {
    colors: {
        grayscale: ["000000", "FFFFFF", "424242", "969696", "545454", "757575", "353535", "B8B8B8", "545454", "353535", "757575", "444444", "6C6C6C", "B8B8B8", "6C6C6C", "959595"],
        vice: ["000000", "FFFFFF", "68372b", "70a4b2", "6f3d86", "588d43", "352879", "b8c76f", "6f4f25", "433900", "9a6759", "444444", "6c6c6c", "9ad284", "6c5eb5", "959595"],
        green: ["010201", "2cdd42", "0d4114", "1c8e2a", "105018", "167022", "0a310f", "22ad34", "105018", "0b3510", "167022", "0d4214", "15671f", "22ad34", "14661f", "1c8f2b"],
        ccs64: ["101010", "FFFFFF", "E04040", "60FFFF", "E060E0", "40E040", "4040E0", "FFFF40", "E0A040", "9C7448", "FFA0A0", "545454", "888888", "A0FFA0", "A0A0FF", "C0C0C0"]
    },
    keys: [{
            up: 38,
            right: 39,
            down: 40,
            left: 37,
            fire: 17
        },
        {
            up: 87,
            right: 68,
            down: 83,
            left: 65,
            fire: 16
        }
    ],
    circleColors: [1, 3, 5, 4, 6, 0],
    board: ["010222101".split(""), "102120210".split(""), "021021021".split(""), "210120102".split(""), "122222220".split(""), "210120102".split(""), "021021021".split(""), "102120210".split(""), "010222101".split("")],
    spells: ["teleport", "heal", "shift time", "exchange", "summon elemental", "revive", "imprison", "cease conjuring"],
    sides: ["light", "dark"],
    sprites: {
        goblin: {
            y: 144,
            move: {
                left: [20, 40, 60, 40],
                right: [80, 100, 120, 100],
                up: [200, 220, 200, 240],
                down: [140, 160, 140, 180]
            },
            shot: {
                left: 260,
                right: 280,
                up: 300,
                down: 320,
                leftUp: 380,
                rightUp: 400,
                leftDown: 360,
                rightDown: 340
            },
            bullet: {
                left: {
                    x: 420,
                    y: 148,
                    w: 16,
                    h: 3,
                    xo: -14,
                    yo: 7
                },
                right: {
                    x: 420,
                    y: 151,
                    w: 16,
                    h: 3,
                    xo: 18,
                    yo: 7
                },
                up: {
                    x: 420,
                    y: 154,
                    w: 8,
                    h: 8,
                    xo: 6,
                    yo: -7
                },
                down: {
                    x: 420,
                    y: 154,
                    w: 8,
                    h: 8,
                    xo: 4,
                    yo: 16
                },
                leftUp: {
                    x: 436,
                    y: 155,
                    w: 12,
                    h: 7,
                    xo: -12,
                    yo: -2
                },
                rightUp: {
                    x: 448,
                    y: 155,
                    w: 12,
                    h: 7,
                    xo: 20,
                    yo: -2
                },
                leftDown: {
                    x: 448,
                    y: 148,
                    w: 12,
                    h: 7,
                    xo: -12,
                    yo: 12
                },
                rightDown: {
                    x: 436,
                    y: 148,
                    w: 12,
                    h: 7,
                    xo: 20,
                    yo: 12
                }
            }
        },
        manticore: {
            y: 162,
            move: {
                left: [20, 40, 60, 40],
                right: [80, 100, 120, 100],
                up: [140, 160, 140, 180],
                down: [200, 220, 200, 240]
            },
            shot: {
                left: 260,
                right: 280,
                up: 300,
                down: 320,
                leftUp: 340,
                rightUp: 360,
                leftDown: 380,
                rightDown: 400
            },
            bullet: {
                left: {
                    x: 421,
                    y: 163,
                    w: 10,
                    h: 5,
                    xo: -10,
                    yo: 5
                },
                right: {
                    x: 421,
                    y: 168,
                    w: 10,
                    h: 5,
                    xo: 20,
                    yo: 5
                },
                up: {
                    x: 421,
                    y: 173,
                    w: 10,
                    h: 6,
                    xo: 6,
                    yo: -6
                },
                down: {
                    x: 421,
                    y: 173,
                    w: 10,
                    h: 6,
                    xo: 4,
                    yo: 19
                },
                leftUp: {
                    x: 432,
                    y: 163,
                    w: 10,
                    h: 7,
                    xo: -10,
                    yo: -2
                },
                rightUp: {
                    x: 443,
                    y: 163,
                    w: 10,
                    h: 7,
                    xo: 20,
                    yo: -2
                },
                leftDown: {
                    x: 432,
                    y: 171,
                    w: 10,
                    h: 7,
                    xo: -10,
                    yo: 12
                },
                rightDown: {
                    x: 443,
                    y: 171,
                    w: 10,
                    h: 7,
                    xo: 10,
                    yo: 12
                }
            }
        },
        banshee: {
            y: 180,
            move: {
                left: [20, 40, 60, 80],
                right: [100, 120, 140, 160],
                up: [180, 200, 180, 220],
                down: [240, 260, 240, 280]
            },
            bullet: {
                type: "scream",
                sprite: {
                    x: 329,
                    y: 313,
                    w: 48,
                    h: 42
                }
            }
        },
        troll: {
            y: 198,
            move: {
                left: [20, 40, 60, 80],
                right: [100, 120, 140, 160],
                up: [180, 200, 180, 220],
                down: [240, 260, 240, 280]
            },
            shot: {
                left: 320,
                right: 300,
                up: 340,
                down: 360,
                leftUp: 380,
                rightUp: 400,
                leftDown: 420,
                rightDown: 440
            },
            bullet: {
                animated: !0,
                w: 12,
                h: 8,
                phases: [{
                        x: 460,
                        y: 198
                    },
                    {
                        x: 460,
                        y: 206
                    },
                    {
                        x: 472,
                        y: 198
                    },
                    {
                        x: 472,
                        y: 206
                    }
                ]
            }
        },
        basilisk: {
            y: 216,
            move: {
                left: [20, 40, 60, 80],
                right: [100, 120, 140, 160],
                up: [180, 200, 180, 220],
                down: [240, 260, 240, 280]
            },
            shot: {
                left: 300,
                right: 320,
                up: 340,
                down: 360,
                leftUp: 380,
                rightUp: 400,
                leftDown: 420,
                rightDown: 440
            },
            bullet: {
                left: {
                    x: 460,
                    y: 216,
                    w: 8,
                    h: 3
                },
                right: {
                    x: 460,
                    y: 220,
                    w: 8,
                    h: 3
                },
                up: {
                    x: 460,
                    y: 224,
                    w: 10,
                    h: 4
                },
                down: {
                    x: 460,
                    y: 224,
                    w: 10,
                    h: 4
                },
                leftUp: {
                    x: 460,
                    y: 229,
                    w: 8,
                    h: 4,
                    xo: -10,
                    yo: -1
                },
                rightUp: {
                    x: 469,
                    y: 229,
                    w: 8,
                    h: 4,
                    xo: 22,
                    yo: -1
                },
                leftDown: {
                    x: 469,
                    y: 229,
                    w: 8,
                    h: 4
                },
                rightDown: {
                    x: 460,
                    y: 229,
                    w: 8,
                    h: 4
                }
            }
        },
        shapeshifter: {
            y: 234,
            move: {
                left: [20, 40, 60, 80],
                right: [100, 120, 140, 160],
                up: [100, 120, 140, 160],
                down: [100, 120, 140, 160]
            },
            shot: {},
            bullet: {}
        },
        dragon: {
            y: 252,
            move: {
                left: [20, 40, 60, 40],
                right: [80, 100, 120, 100],
                up: [200, 220, 200, 240],
                down: [140, 160, 140, 180]
            },
            shot: {
                left: 260,
                right: 280,
                up: 300,
                down: 320,
                leftUp: 340,
                rightUp: 360,
                leftDown: 400,
                rightDown: 380
            },
            bullet: {
                left: {
                    x: 420,
                    y: 252,
                    w: 16,
                    h: 4
                },
                right: {
                    x: 420,
                    y: 257,
                    w: 16,
                    h: 4
                },
                up: {
                    x: 420,
                    y: 262,
                    w: 6,
                    h: 8
                },
                down: {
                    x: 420,
                    y: 262,
                    w: 6,
                    h: 8
                },
                leftUp: {
                    x: 436,
                    y: 252,
                    w: 16,
                    h: 8
                },
                rightUp: {
                    x: 436,
                    y: 261,
                    w: 16,
                    h: 8
                },
                leftDown: {
                    x: 453,
                    y: 252,
                    w: 16,
                    h: 8
                },
                rightDown: {
                    x: 453,
                    y: 261,
                    w: 16,
                    h: 8
                }
            }
        },
        sorceress: {
            y: 270,
            move: {
                left: [20, 40, 60, 40],
                right: [80, 100, 120, 100],
                up: [140, 160, 140, 180],
                down: [200, 220, 200, 240]
            },
            shot: {
                left: 20,
                right: 80,
                up: 260,
                down: 280,
                leftUp: 300,
                rightUp: 320,
                leftDown: 340,
                rightDown: 360
            },
            bullet: {
                left: {
                    x: 380,
                    y: 271,
                    w: 16,
                    h: 2
                },
                right: {
                    x: 380,
                    y: 274,
                    w: 16,
                    h: 2
                },
                up: {
                    x: 380,
                    y: 279,
                    w: 4,
                    h: 8
                },
                down: {
                    x: 380,
                    y: 279,
                    w: 4,
                    h: 8
                },
                leftUp: {
                    x: 397,
                    y: 271,
                    w: 16,
                    h: 8,
                    xo: -12,
                    yo: -3
                },
                rightUp: {
                    x: 397,
                    y: 280,
                    w: 16,
                    h: 8,
                    xo: 16,
                    yo: -3
                },
                leftDown: {
                    x: 397,
                    y: 280,
                    w: 16,
                    h: 8
                },
                rightDown: {
                    x: 397,
                    y: 271,
                    w: 16,
                    h: 8
                }
            }
        },
        knight: {
            y: 0,
            move: {
                left: [20, 40, 60, 80],
                right: [100, 120, 140, 160],
                up: [180, 200, 180, 220],
                down: [240, 260, 240, 280]
            },
            shot: {
                left: 300,
                right: 320,
                up: 340,
                down: 360,
                leftUp: 420,
                rightUp: 440,
                leftDown: 400,
                rightDown: 380
            },
            bullet: {
                left: {
                    x: 461,
                    y: 16,
                    w: 16,
                    h: 2,
                    xo: -14,
                    yo: 7
                },
                right: {
                    x: 461,
                    y: 16,
                    w: 16,
                    h: 2,
                    xo: 18,
                    yo: 7
                },
                up: {
                    x: 461,
                    y: 1,
                    w: 4,
                    h: 8,
                    xo: 12,
                    yo: -7
                },
                down: {
                    x: 461,
                    y: 1,
                    w: 4,
                    h: 8,
                    xo: 10,
                    yo: 16
                },
                leftUp: {
                    x: 466,
                    y: 1,
                    w: 14,
                    h: 6,
                    xo: -14,
                    yo: -2
                },
                rightUp: {
                    x: 466,
                    y: 8,
                    w: 14,
                    h: 6,
                    xo: 20,
                    yo: -2
                },
                leftDown: {
                    x: 466,
                    y: 8,
                    w: 14,
                    h: 6,
                    xo: -12,
                    yo: 13
                },
                rightDown: {
                    x: 466,
                    y: 1,
                    w: 14,
                    h: 6,
                    xo: 18,
                    yo: 13
                }
            }
        },
        archer: {
            y: 18,
            move: {
                left: [20, 40, 60, 80],
                right: [100, 120, 140, 160],
                up: [240, 280, 240, 260],
                down: [180, 200, 180, 220]
            },
            shot: {
                left: 300,
                right: 320,
                up: 340,
                down: 360,
                leftUp: 380,
                rightUp: 400,
                leftDown: 440,
                rightDown: 420
            },
            bullet: {
                left: {
                    x: 461,
                    y: 19,
                    w: 12,
                    h: 1,
                    xo: -12,
                    yo: 7
                },
                right: {
                    x: 461,
                    y: 19,
                    w: 12,
                    h: 1,
                    xo: 20,
                    yo: 7
                },
                up: {
                    x: 461,
                    y: 21,
                    w: 2,
                    h: 7,
                    xo: 12,
                    yo: -7
                },
                down: {
                    x: 461,
                    y: 21,
                    w: 2,
                    h: 7,
                    xo: 10,
                    yo: 19
                },
                leftUp: {
                    x: 464,
                    y: 21,
                    w: 10,
                    h: 6,
                    xo: -12,
                    yo: -2
                },
                rightUp: {
                    x: 461,
                    y: 29,
                    w: 10,
                    h: 6,
                    xo: 20,
                    yo: -2
                },
                leftDown: {
                    x: 461,
                    y: 29,
                    w: 10,
                    h: 6,
                    xo: -10,
                    yo: 13
                },
                rightDown: {
                    x: 464,
                    y: 21,
                    w: 10,
                    h: 6,
                    xo: 20,
                    yo: 13
                }
            }
        },
        valkyrie: {
            y: 36,
            move: {
                left: [100, 120, 140, 160],
                right: [20, 40, 60, 80],
                up: [180, 200, 180, 220],
                down: [240, 260, 240, 280]
            },
            shot: {
                left: 320,
                right: 300,
                up: 340,
                down: 360,
                leftUp: 380,
                rightUp: 400,
                leftDown: 440,
                rightDown: 420
            },
            bullet: {
                left: {
                    x: 461,
                    y: 36,
                    w: 16,
                    h: 1,
                    xo: -14,
                    yo: 7
                },
                right: {
                    x: 461,
                    y: 36,
                    w: 16,
                    h: 1,
                    xo: 18,
                    yo: 7
                },
                up: {
                    x: 461,
                    y: 38,
                    w: 4,
                    h: 8,
                    xo: 10,
                    yo: -7
                },
                down: {
                    x: 461,
                    y: 38,
                    w: 4,
                    h: 8,
                    xo: 8,
                    yo: 16
                },
                leftUp: {
                    x: 466,
                    y: 38,
                    w: 16,
                    h: 7,
                    xo: -14,
                    yo: -3
                },
                rightUp: {
                    x: 466,
                    y: 46,
                    w: 16,
                    h: 7,
                    xo: 18,
                    yo: -3
                },
                leftDown: {
                    x: 466,
                    y: 46,
                    w: 16,
                    h: 7,
                    xo: -14,
                    yo: 12
                },
                rightDown: {
                    x: 466,
                    y: 38,
                    w: 16,
                    h: 7,
                    xo: 18,
                    yo: 12
                }
            }
        },
        golem: {
            y: 54,
            move: {
                left: [100, 120, 140, 160],
                right: [20, 40, 60, 80],
                up: [180, 200, 180, 220],
                down: [240, 260, 240, 280]
            },
            shot: {
                left: 300,
                right: 320,
                up: 340,
                down: 360,
                leftUp: 380,
                rightUp: 400,
                leftDown: 440,
                rightDown: 420
            },
            bullet: {
                animated: !0,
                w: 12,
                h: 8,
                phases: [{
                        x: 460,
                        y: 55
                    },
                    {
                        x: 460,
                        y: 63
                    },
                    {
                        x: 472,
                        y: 55
                    },
                    {
                        x: 472,
                        y: 63
                    }
                ]
            }
        },
        unicorn: {
            y: 72,
            move: {
                left: [100, 120, 140, 160],
                right: [20, 40, 60, 80],
                up: [180, 200, 180, 220],
                down: [240, 260, 240, 280]
            },
            shot: {
                left: 320,
                right: 300,
                up: 340,
                down: 360,
                leftUp: 400,
                rightUp: 380,
                leftDown: 440,
                rightDown: 420
            },
            bullet: {
                left: {
                    x: 460,
                    y: 72,
                    w: 16,
                    h: 1
                },
                right: {
                    x: 460,
                    y: 72,
                    w: 16,
                    h: 1
                },
                up: {
                    x: 460,
                    y: 74,
                    w: 2,
                    h: 8,
                    xo: 12
                },
                down: {
                    x: 460,
                    y: 74,
                    w: 2,
                    h: 8,
                    xo: 10
                },
                leftUp: {
                    x: 462,
                    y: 81,
                    w: 16,
                    h: 8,
                    xo: -14,
                    yo: -3
                },
                rightUp: {
                    x: 462,
                    y: 73,
                    w: 16,
                    h: 8,
                    xo: 20,
                    yo: -3
                },
                leftDown: {
                    x: 462,
                    y: 73,
                    w: 16,
                    h: 8
                },
                rightDown: {
                    x: 462,
                    y: 81,
                    w: 16,
                    h: 8
                }
            }
        },
        djinni: {
            y: 90,
            move: {
                left: [100, 120, 140, 160],
                right: [20, 40, 60, 80],
                up: [180, 200, 180, 220],
                down: [240, 260, 240, 280]
            },
            shot: {
                left: 320,
                right: 300,
                up: 340,
                down: 360,
                leftUp: 380,
                rightUp: 400,
                leftDown: 420,
                rightDown: 440
            },
            bullet: {
                animated: !0,
                w: 8,
                h: 7,
                phases: [{
                        x: 461,
                        y: 91
                    },
                    {
                        x: 461,
                        y: 101
                    },
                    {
                        x: 470,
                        y: 91
                    },
                    {
                        x: 470,
                        y: 101
                    }
                ]
            }
        },
        phoenix: {
            y: 108,
            move: {
                left: [100, 120, 140, 160],
                right: [20, 40, 60, 80],
                up: [180, 200, 180, 220],
                down: [240, 260, 240, 280]
            },
            bullet: {
                type: "fire",
                phases: [{
                        x: 237,
                        y: 313,
                        w: 20,
                        h: 17
                    },
                    {
                        x: 257,
                        y: 313,
                        w: 24,
                        h: 21
                    },
                    {
                        x: 281,
                        y: 313,
                        w: 48,
                        h: 42
                    }
                ]
            }
        },
        wizard: {
            y: 126,
            move: {
                left: [100, 120, 140, 160],
                right: [20, 40, 60, 80],
                up: [180, 200, 180, 220],
                down: [240, 260, 240, 280]
            },
            shot: {
                left: 320,
                right: 300,
                up: 340,
                down: 360,
                leftUp: 380,
                rightUp: 400,
                leftDown: 420,
                rightDown: 440
            },
            bullet: {
                animated: !0,
                w: 12,
                h: 6,
                phases: [{
                        x: 460,
                        y: 126
                    },
                    {
                        x: 460,
                        y: 133
                    },
                    {
                        x: 473,
                        y: 126
                    },
                    {
                        x: 473,
                        y: 133
                    }
                ]
            }
        },
        earthElemental: {
            y: 288,
            move: {
                left: [0, 20, 40, 60],
                right: [80, 100, 120, 140],
                up: [160, 180, 160, 200],
                down: [220, 240, 220, 260]
            },
            shot: {
                left: 300,
                right: 280,
                up: 320,
                down: 340,
                leftUp: 360,
                rightUp: 380,
                leftDown: 400,
                rightDown: 420
            },
            bullet: {
                animated: !0,
                w: 12,
                h: 8,
                phases: [{
                        x: 440,
                        y: 289
                    },
                    {
                        x: 440,
                        y: 297
                    },
                    {
                        x: 452,
                        y: 289
                    },
                    {
                        x: 452,
                        y: 297
                    }
                ]
            }
        },
        fireElemental: {
            y: 306,
            move: {
                left: [0, 20, 40, 60],
                right: [80, 100, 120, 140],
                up: [80, 100, 80, 120],
                down: [80, 100, 80, 120]
            },
            shot: {
                left: 40,
                right: 120,
                up: 80,
                down: 80,
                leftUp: 20,
                rightUp: 100,
                leftDown: 60,
                rightDown: 140
            },
            bullet: {
                animated: !0,
                w: 10,
                h: 6,
                phases: [{
                        x: 160,
                        y: 308
                    },
                    {
                        x: 160,
                        y: 315
                    },
                    {
                        x: 173,
                        y: 308
                    }
                ]
            }
        },
        waterElemental: {
            y: 324,
            move: {
                left: [0, 20, 40, 20],
                right: [60, 80, 100, 80],
                up: [60, 80, 60, 100],
                down: [60, 80, 60, 100]
            },
            shot: {
                left: 40,
                right: 100,
                up: 60,
                down: 60,
                leftUp: 20,
                rightUp: 80,
                leftDown: 80,
                rightDown: 20
            },
            bullet: {
                animated: !0,
                w: 10,
                h: 6,
                phases: [{
                        x: 121,
                        y: 326
                    },
                    {
                        x: 121,
                        y: 333
                    },
                    {
                        x: 134,
                        y: 326
                    }
                ]
            }
        },
        airElemental: {
            y: 342,
            move: {
                left: [0, 20],
                right: [0, 20],
                up: [0, 20],
                down: [0, 20]
            },
            shot: {
                left: 60,
                right: 40,
                up: 80,
                down: 100,
                leftUp: 180,
                rightUp: 160,
                leftDown: 120,
                rightDown: 140
            },
            bullet: {
                animated: !0,
                w: 8,
                h: 7,
                phases: [{
                        x: 200,
                        y: 342
                    },
                    {
                        x: 200,
                        y: 352
                    },
                    {
                        x: 209,
                        y: 342
                    },
                    {
                        x: 209,
                        y: 352
                    }
                ]
            }
        }
    },
    icons: {
        knight: {
            side: "light",
            canFly: !1,
            maxSteps: 3,
            baseHP: 5,
            speed: 100,
            dmg: 5,
            shotSpeed: -1,
            attackRate: .76,
            sounds: {
                step: "stepKnight",
                fire: "shotMelee"
            }
        },
        archer: {
            side: "light",
            canFly: !1,
            maxSteps: 3,
            baseHP: 5,
            speed: 100,
            dmg: 5,
            shotSpeed: 8,
            attackRate: 1.56,
            sounds: {
                step: "stepKnight",
                fire: "shotRanged"
            }
        },
        valkyrie: {
            side: "light",
            canFly: !0,
            maxSteps: 3,
            baseHP: 8,
            speed: 100,
            dmg: 7,
            shotSpeed: 6,
            attackRate: 1.56,
            sounds: {
                step: "stepValkyrie",
                fire: "shotRanged"
            }
        },
        golem: {
            side: "light",
            canFly: !1,
            maxSteps: 3,
            baseHP: 15,
            speed: 75,
            dmg: 10,
            shotSpeed: 6,
            attackRate: 1.94,
            sounds: {
                step: "stepGolem",
                fire: "shotRanged"
            }
        },
        unicorn: {
            side: "light",
            canFly: !1,
            maxSteps: 4,
            baseHP: 9,
            speed: 100,
            dmg: 7,
            shotSpeed: 14,
            attackRate: 1.18,
            sounds: {
                step: "stepUnicorn",
                fire: "shotRanged"
            }
        },
        djinni: {
            side: "light",
            canFly: !0,
            maxSteps: 4,
            baseHP: 15,
            speed: 100,
            dmg: 6,
            shotSpeed: 10,
            attackRate: 1.78,
            sounds: {
                step: "stepValkyrie",
                fire: "shotRanged"
            }
        },
        phoenix: {
            side: "light",
            canFly: !0,
            maxSteps: 5,
            baseHP: 12,
            speed: 100,
            dmg: 2,
            shotSpeed: -1,
            attackRate: 1.98,
            sounds: {
                step: "stepPhoenix",
                fire: "shotPhoenix"
            }
        },
        wizard: {
            side: "light",
            canFly: !0,
            maxSteps: 3,
            baseHP: 10,
            speed: 100,
            dmg: 10,
            shotSpeed: 10,
            attackRate: 1.56,
            sounds: {
                step: "stepKnight",
                fire: "shotRanged"
            }
        },
        goblin: {
            side: "dark",
            canFly: !1,
            maxSteps: 3,
            baseHP: 5,
            speed: 100,
            dmg: 5,
            shotSpeed: -1,
            attackRate: .76,
            sounds: {
                step: "stepKnight",
                fire: "shotMelee"
            }
        },
        manticore: {
            side: "dark",
            canFly: !1,
            maxSteps: 3,
            baseHP: 8,
            speed: 100,
            dmg: 4,
            shotSpeed: 6,
            attackRate: 1.56,
            sounds: {
                step: "stepUnicorn",
                fire: "shotRanged"
            }
        },
        banshee: {
            side: "dark",
            canFly: !0,
            maxSteps: 3,
            baseHP: 8,
            speed: 100,
            dmg: 1,
            shotSpeed: -1,
            attackRate: 1.96,
            sounds: {
                step: "stepValkyrie",
                fire: "shotBanshee"
            }
        },
        troll: {
            side: "dark",
            canFly: !1,
            maxSteps: 3,
            baseHP: 14,
            speed: 75,
            dmg: 10,
            shotSpeed: 6,
            attackRate: 1.94,
            sounds: {
                step: "stepGolem",
                fire: "shotRanged"
            }
        },
        basilisk: {
            side: "dark",
            canFly: !1,
            maxSteps: 3,
            baseHP: 6,
            speed: 100,
            dmg: 9,
            shotSpeed: 14,
            attackRate: 1.18,
            sounds: {
                step: "stepBasilisk",
                fire: "shotRanged"
            }
        },
        shapeshifter: {
            side: "dark",
            canFly: !0,
            maxSteps: 5,
            baseHP: -1,
            speed: 100,
            dmg: -1,
            shotSpeed: -1,
            attackRate: -1,
            sounds: {
                step: "stepValkyrie",
                fire: ""
            }
        },
        dragon: {
            side: "dark",
            canFly: !0,
            maxSteps: 4,
            baseHP: 17,
            speed: 100,
            dmg: 11,
            shotSpeed: 8,
            attackRate: 2.38,
            sounds: {
                step: "stepDragon",
                fire: "shotRanged"
            }
        },
        sorceress: {
            side: "dark",
            canFly: !0,
            maxSteps: 3,
            baseHP: 10,
            speed: 100,
            dmg: 8,
            shotSpeed: 12,
            attackRate: 1.56,
            sounds: {
                step: "stepKnight",
                fire: "shotRanged"
            }
        },
        airElemental: {
            side: "elemental",
            name: "air elemental",
            canFly: !0,
            maxSteps: 99,
            baseHP: 12,
            speed: 100,
            dmg: 5,
            shotSpeed: 8,
            attackRate: 1.38,
            sounds: {
                step: "stepValkyrie",
                fire: "shotRanged"
            }
        },
        fireElemental: {
            side: "elemental",
            name: "fire elemental",
            canFly: !0,
            maxSteps: 99,
            baseHP: 10,
            speed: 100,
            dmg: 9,
            shotSpeed: 10,
            attackRate: 1.16,
            sounds: {
                step: "stepValkyrie",
                fire: "shotRanged"
            }
        },
        earthElemental: {
            side: "elemental",
            name: "earth elemental",
            canFly: !0,
            maxSteps: 99,
            baseHP: 17,
            speed: 75,
            dmg: 9,
            shotSpeed: 6,
            attackRate: 1.98,
            sounds: {
                step: "stepGolem",
                fire: "shotRanged"
            }
        },
        waterElemental: {
            side: "elemental",
            name: "water elemental",
            canFly: !0,
            maxSteps: 99,
            baseHP: 14,
            speed: 100,
            dmg: 6,
            shotSpeed: 6,
            attackRate: 1.96,
            sounds: {
                step: "stepDragon",
                fire: "shotRanged"
            }
        }
    }
};
var getElement = function(e) {
        return document.querySelector("#" + e)
    },
    I = function(e, n) {
        Array.prototype.slice.call(document.querySelectorAll(e)).map(n)
    },
    hide = function(e) {
        getElement(e).classList.add("hide")
    },
    show = function(e) {
        getElement(e).classList.remove("hide")
    },
    isOnline = function() {
        return !!engine.room
    },
    rnd = function(e) {
        return Math.floor(Math.random() * e) + 1
    },
    ucFirst = function(e) {
        var n = e.charAt(0).toUpperCase();
        return n + e.substr(1)
    },
    cloneObj = function(e) {
        return JSON.parse(JSON.stringify(e))
    },
    boxCollision = function(e, n, t, r, o, i, s, a) {
        return o > e + t || e > o + s || i > n + r || n > i + a ? !1 : !0
    },
    spriteCollision = function(e, n, t, r, o, i, s, a, l, g) {
        l = Math.round(l), g = Math.round(g);
        for (var c, f, u = 0; r > u; u++)
            for (var d = 0; t > d; d++)
                if (!(l > d || g > u || d > l + s || u > g + a) && engine.spriteMap[u + n][d + e] && (c = i - g + u, f = o - l + d, !(0 > c || 0 > f || c >= engine.spriteHeight || f >= engine.spriteWidth) && engine.spriteMap[c][f])) return !0;
        return !1
    },
    opp = function(e) {
        return "light" == e ? "dark" : "light"
    },
    isPowerPoint = function(e, n) {
        return 4 == e && 0 == n || 0 == e && 4 == n || 4 == e && 4 == n || 8 == e && 4 == n || 4 == e && 8 == n ? !0 : !1
    },
    snd = function(e, n, t) {
        n = n || !1, engine.audio.request({
            name: e,
            loop: n,
            side: t
        })
    },
    hold = function(e, n) {
        if ("number" == typeof e) engine.pressedKeys[e] = "hold";
        else {
            n || (n = game.actualSide);
            var t = getKeyIndex(n);
            for (var r in DATA.keys[t]) r == e && (engine.pressedKeys[DATA.keys[t][r]] = "hold")
        }
    },
    getJoy = function(e) {
        return 0 !== e && 1 !== e && (e = getKeyIndex()), {
            up: engine.pressedKeys[DATA.keys[e].up],
            down: engine.pressedKeys[DATA.keys[e].down],
            left: engine.pressedKeys[DATA.keys[e].left],
            right: engine.pressedKeys[DATA.keys[e].right],
            fire: engine.pressedKeys[DATA.keys[e].fire]
        }
    },
    getKeyIndex = function(e) {
        return e || (e = game.actualSide), isOnline() ? online.sideP1 == e ? 0 : 1 : "gamepad" == engine.options.lightControl && "gamepad" == engine.options.darkControl ? "light" == e ? 1 : 0 : "light" == e && "gamepad" == engine.options.lightControl ? "keyboardWasd" == engine.options.darkControl ? 0 : 1 : "dark" == e && "gamepad" == engine.options.darkControl ? "keyboardWasd" == engine.options.lightControl ? 0 : 1 : "light" == e && "keyboardArrows" == engine.options.lightControl || "dark" == e && "keyboardArrows" == engine.options.darkControl ? 0 : 1
    },
    getDirectionByJoy = function(e) {
        return e.up && e.left ? "leftUp" : e.up && e.right ? "rightUp" : e.down && e.left ? "leftDown" : e.down && e.right ? "rightDown" : e.up ? "up" : e.down ? "down" : e.left ? "left" : e.right ? "right" : !1
    },
    diagonalDirection = function(e) {
        return "leftUp" == e ? e = "left" : "leftDown" == e ? e = "left" : "rightUp" == e ? e = "right" : "rightDown" == e && (e = "right"), e
    },
    sec = function(e) {
        return Math.round(engine.scanFPS * e)
    },
    sfc = function(e, n) {
        game.frameCounters[e] = n ? sec(n) : 1
    },
    rfc = function(e) {
        game.frameCounters[e] = 0
    },
    gfc = function(e) {
        return game.frameCounters[e]
    },
    ifc = function(e, n) {
        return game.frameCounters[e] += n || 1, gfc(e)
    },
    dfc = function(e, n) {
        return game.frameCounters[e] -= n || 1, gfc(e)
    },
    borderColorLast = 0,
    borderColor = function(e) {
        borderColorLast = e, getElement("border").style.background = "#" + (DATA.colors[engine.options.palette] || DATA.colors["ccs64"])[e]
    },
    refreshBorderColor = function() {
        borderColor(borderColorLast)
    },
    fillStyleLast = 16,
    fillStyle = function(e) {
        fillStyleLast != e && (fillStyleLast = e, engine.canvas.fillStyle = "#" + (DATA.colors[engine.options.palette] || DATA.colors["ccs64"])[e])
    },
    rect = function(e, n, t, r, o) {
        o !== !1 && fillStyle(o), engine.canvas.fillRect(e * engine.scale, n * engine.scale, t * engine.scale, r * engine.scale)
    },
    draw = function(e, n, t, r, o, i) {
        engine.canvas.drawImage(engine.sprite, e, n, t, r, o * engine.scale, i * engine.scale, t * engine.scale, r * engine.scale)
    },
    opacity = function(e) {
        engine.visualFilterContext.globalAlpha = e
    },
    cls = function(e) {
        e = e || 0, rect(0, 0, 320, 200, e)
    },
    drawText = function(e, n, t) {
        e = e.toString().toUpperCase(), fillStyle(1);
        for (var r = 0; r < e.length; r++) {
            var o = e[r];
            if (" " != o) {
                var i = "I" == o ? engine.scale : 0;
                engine.canvas.fillText(o, n * engine.scale + r * (8 * engine.scale) + i, t * engine.scale)
            }
        }
    },
    ajax = function(e, n, t) {
        var r = new XMLHttpRequest;
        r.open("POST", e, !0), r.onload = function() {
            if (200 === r.status) {
                var e = JSON.parse(r.responseText);
                "ok" !== e.status ? console.error(e.reason) : t && t(e)
            } else console.error(r.status)
        }, r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), r.send("data=" + JSON.stringify(n))
    },
    isChrome = !!navigator.webkitGetUserMedia,
    isFirefox = !!navigator.mozGetUserMedia,
    isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0,
    bwTvGradient;

function ArchonIcon(t, i, s, h) {
    this._num = h, this.type = t, "shapeshifter" == this.type && (this.shapeshifter = !0), this.prop = cloneObj(DATA.icons[t]), this.sprites = cloneObj(DATA.sprites[t]), this.side = this.prop.side, this.name = "elemental" == this.prop.side ? this.prop.name : t, this.canFly = this.prop.canFly, this.moveType = this.canFly ? "wizard" == this.type || "sorceress" == this.type ? "teleport" : "fly" : "ground", this.maxSteps = this.prop.maxSteps, this.baseHP = this.prop.baseHP, this.speed = this.prop.speed, this.dmg = this.prop.dmg, this.shotSpeed = this.prop.shotSpeed, this.attackRate = this.prop.attackRate, this.slow = !1, this.col = i, this.row = s, this.hp = "elemental" == this.side ? this.baseHP : 0, this.injuries = 0, this.imprisoned = !1, this.dead = !1, this.selected = !1, this.animationPhase = 0, this.moving = !1, this.isMage = function() {
        return "wizard" == this.type || "sorceress" == this.type
    }, this.onRow = function() {
        return Math.round(this.y) !== this.y ? !1 : !((this.y - 24 + 1) % 16)
    }, this.onField = function() {
        return this.onRow() && this.onCol()
    }, this.onCol = function() {
        return Math.round(this.x) !== this.x ? !1 : !((this.x - 4) % 24)
    }, this.getCol = function() {
        return Math.round((Math.round(this.x) - 4) / 24 - 2)
    }, this.getRow = function() {
        return Math.round((Math.round(this.y) - 24 + 1) / 16)
    }, this.onPowerPoint = function() {
        return isPowerPoint(this.col, this.row)
    }, this.isElemental = function() {
        return -1 !== this.name.indexOf(" elemental")
    }, this.stepAnimationPhase = function() {
        var t = 4;
        if (75 == this.speed && (t = "table" == game.scene ? 8 : 6), this.slow && (t *= 2), !(engine.scanFrameCounter % t)) {
            this.animationPhase++;
            var i = diagonalDirection(this.d);
            this.animationPhase >= this.sprites.move[i].length && (this.animationPhase = 0)
        }
    }, this.canStartMove = function() {
        if (this.isMage()) return !0;
        if (0 == this.canFly) {
            var t;
            return this.row > 0 && (t = game.getIconOnBoard(this.col, this.row - 1), !t || t.side != this.side) ? !0 : this.row < 8 && (t = game.getIconOnBoard(this.col, this.row + 1), !t || t.side != this.side) ? !0 : this.col > 0 && (t = game.getIconOnBoard(this.col - 1, this.row), !t || t.side != this.side) ? !0 : this.col < 8 && (t = game.getIconOnBoard(this.col + 1, this.row), !t || t.side != this.side) ? !0 : !1
        }
        for (var i = this.row - this.maxSteps; i <= this.row + this.maxSteps; i++)
            for (var s = this.col - this.maxSteps; s <= this.col + this.maxSteps; s++)
                if (i >= 0 && 8 >= i && s >= 0 && 8 >= s) {
                    var t = game.getIconOnBoard(s, i);
                    if (!t || t.side != this.side) return !0
                }
        return !1
    }, this.setPos = function(t, i) {
        this.x = t, this.y = i
    }, this.savePreviousPos = function() {
        this.prevCol = this.getCol(), this.prevRow = this.getRow()
    }, this.startStep = function() {
        this.moving || (snd(this.prop.sounds.step, !0, this.side), this.moving = !0)
    }, this.stopStep = function() {
        this.moving && (this.animationPhase = 0, this.setPos(Math.round(this.x), Math.round(this.y)), engine.audio.stop(this.prop.sounds.step, this.side), this.moving = !1)
    }, this.heal = function() {
        this.injuries = 0
    }, this.heal1Hp = function() {
        this.injuries > 0 && this.injuries--
    }, this.setCombatHp = function(t, i) {
        this.hp = this.baseHP - this.injuries + game.getHpBonus(t, i, this.side)
    }, this.kill = function() {
        this.hp = -1, this.dead = !0
    }, this.isDead = function() {
        return this.hp <= 0
    }, this.reviving = function(t) {
        this.d = "light" == this.side ? "right" : "left", this.x = "light" == this.side ? 4 : 292, this.y = 24 + 16 * t - 1, this.selected = !0, this.dead = !1, this.imprisoned = !1, this.heal(), this.canFly = !0, this.maxSteps = 99
    }, this.afterReviving = function(t, i) {
        this.row = t, this.col = i, this.maxSteps = this.prop.maxSteps, this.canFly = this.prop.canFly
    }, 1 == this.shapeshifter && (this.resetShapeshifter = function() {
        this.type = "shapeshifter", this.prop = cloneObj(DATA.icons.shapeshifter), this.sprites = cloneObj(DATA.sprites.shapeshifter), this.speed = 100
    })
}

function ArchonGame(a) {
    this.scene = a, this.paused = !1, this.menuLevel = 1, this.ctrlTexts = {
        light: !1,
        dark: !1
    }, this.icons = [], this.cursor = {
        x: 0,
        y: 0
    }, this.selectedIcon = !1, this.cannotMoveIcon = !1, this.alreadySummonedElemental = !1, this.gameEnded = !1, this.line1 = !1, this.line2 = !1, this.spelling = !1, this.spellIndex = 0, this.spells = {}, this.invertCycle = 0, this.delayName = !1, this.delayFunc = !1, this.togglePause = function(a) {
        "undefined" == typeof a ? game.paused = !game.paused : game.paused = a, game.paused && engine.audio.stopAllSound(!0)
    }, this.animationRoutine = function() {
        "menu" == game.scene ? game.animateMenu() : "table" == game.scene ? game.animateTable() : "combat" == game.scene && game.animateCombat(), "none" != engine.options.visualFilter && game.visualFilter()
    }, this.scanRoutine = function() {
        return gfc("delay") > 0 ? (dfc("delay"), void(0 == gfc("delay") && ("function" == typeof game.delayFunc && game.delayFunc(), game.delayFunc = !1, game.delayName = !1))) : void("menu" == game.scene ? game.scanMenu() : "table" == game.scene ? game.scanTable() : "combat" == game.scene && game.scanCombat())
    }, this.delay = function(a, b, c) {
        gfc("delay") || (sfc("delay", a), "function" == typeof b && (game.delayFunc = b), "string" == typeof c && (game.delayName = c))
    }, this.refreshPressedKeysByGamepad = function() {
        if (navigator.getGamepads) {
            var a = 0;
            if (isOnline() ? "gamepad" == engine.options.onlineControl && (a = 1) : ("gamepad" == engine.options.lightControl && a++, "gamepad" == engine.options.darkControl && a++), a)
                for (var b = 0; b < a; b++) {
                    var c = navigator.getGamepads()[b];
                    if (void 0 !== c && null !== c) {
                        var d = c.buttons,
                            e = c.axes,
                            f = !1;
                        isOnline() && online.connected ? f = DATA.keys[online.playerNo - 1] : 1 == a ? "gamepad" == engine.options.lightControl ? f = "keyboardWasd" == engine.options.darkControl ? DATA.keys[0] : DATA.keys[1] : "gamepad" == engine.options.darkControl && (f = "keyboardWasd" == engine.options.lightControl ? DATA.keys[0] : DATA.keys[1]) : 2 == a && (f = DATA.keys[b]);
                        var g = !1,
                            h = d && (d[0].pressed || d[1].pressed || d[2].pressed || d[3].pressed);
                        h && "hold" !== engine.pressedKeys[f.fire] ? (engine.pressedKeys[f.fire] = !0, g = !0) : h || (engine.pressedKeys[f.fire] = !1, g = !0);
                        var i = d && d[12] && d[12].pressed || e && e[1] < -.5;
                        i && "hold" !== engine.pressedKeys[f.up] ? (engine.pressedKeys[f.up] = !0, g = !0) : i || (engine.pressedKeys[f.up] = !1, g = !0);
                        var j = d && d[13] && d[13].pressed || e && e[1] > .5;
                        j && "hold" !== engine.pressedKeys[f.down] ? (engine.pressedKeys[f.down] = !0, g = !0) : j || (engine.pressedKeys[f.down] = !1, g = !0);
                        var k = d && d[14] && d[14].pressed || e && e[0] < -.5;
                        k && "hold" !== engine.pressedKeys[f.left] ? (engine.pressedKeys[f.left] = !0, g = !0) : k || (engine.pressedKeys[f.left] = !1, g = !0);
                        var l = d && d[15] && d[15].pressed || e && e[0] > .5;
                        l && "hold" !== engine.pressedKeys[f.right] ? (engine.pressedKeys[f.right] = !0, g = !0) : l || (engine.pressedKeys[f.right] = !1, g = !0), isOnline() && g && 2 == online.playerNo && online.sendPressedKeys()
                    }
                }
        }
    }, this.setMenu = function(a) {
        isOnline() && 1 == online.playerNo && online.send({
            action: "setToggler",
            state: "full"
        }), Menu.setToggler("full"), game.resetFrameCounters(), game.actualSide = a, game.startedBy = a, game.circleStatus = "light" == game.actualSide ? 3 : 2, game.resetCombat(), game.setIcons(), game.cursor.y = 86, game.cursor.x = "light" == game.actualSide ? 0 : 288, borderColor(0), game.scene = "menu"
    }, this.animateMenu = function() {
        if (cls(), game.drawTable(), game.drawIcons(), game.drawPowerPoints(), game.drawCursor(), engine.room) online.connected ? 1 == online.playerNo ? (online.readyP1 ? (drawText(game.actualSide + " first", 8, 184), drawText("I am the " + online.sideP1, 8, 192)) : (drawText("1: " + game.actualSide + " first", 8, 184), drawText("2: I am the " + online.sideP1, 8, 192)), online.readyP1 ? online.readyP2 || (drawText("Waiting for", 208, 184), drawText("your partner", 208, 192)) : (drawText("Press ENTER", 232, 184), drawText("to start", 232, 192))) : 2 == online.playerNo && (drawText(game.actualSide + " first", 8, 184), drawText("I am the " + online.sideP2, 8, 192), online.readyP2 ? online.readyP1 || (drawText("Waiting for", 208, 184), drawText("your partner", 208, 192)) : (drawText("Press ENTER", 232, 184), drawText("to start", 232, 192))) : drawText(online.message, 8, 184);
        else {
            var a = 184;
            1 == game.menuLevel ? (online.disconnectedText && (drawText("* Disconnected *", 96, a - 3), a += 8), drawText("1: Local game", 32, a), drawText("2: Online game", 168, a)) : 2 == game.menuLevel && (drawText("1: Light first", 32, a), drawText("2: Dark first", 168, a))
        }
    }, this.scanMenu = function() {
        engine.room ? online.connected ? 1 == online.playerNo && (online.readyP1 || (engine.pressedKeys[49] === !0 && (hold(49), game.setMenu(opp(game.actualSide)), snd("ready" + ucFirst(game.actualSide))), engine.pressedKeys[50] === !0 && (hold(50), online.sideP1 = opp(online.sideP1), online.sideP2 = opp(online.sideP2))), getJoy(0).fire !== !0 || online.readyP1 || (hold("fire"), online.readyP1 = !0, online.testReady())) : engine.pressedKeys[27] === !0 && (hold(27), online.reset(), online.disconnectedText = !1, game.menuLevel = 1) : 1 == game.menuLevel ? engine.pressedKeys[49] === !0 ? (hold(49), online.disconnectedText = !1, game.menuLevel = 2) : engine.pressedKeys[50] === !0 && (hold(50), online.disconnectedText = !1, online.startNewOnlineGame()) : 2 == game.menuLevel && (engine.pressedKeys[49] === !0 ? (hold(49), game.startNewGame("light"), game.menuLevel = 1) : engine.pressedKeys[50] === !0 ? (hold(50), game.startNewGame("dark"), game.menuLevel = 1) : engine.pressedKeys[27] === !0 && (hold(27), game.menuLevel = 1))
    }, this.resetFrameCounters = function() {
        this.frameCounters = {
            delay: 0,
            powerPointRestriction: 0,
            cancelSpell: 0,
            teleportAnimation: 0,
            combat: 0,
            combatEnd: 0
        }
    }, this.resetFrameCounters(), this.resetCursorMove = function() {
        this.cursorMove = {
            up: !1,
            down: !1,
            left: !1,
            right: !1
        }
    }, this.resetCursorMove(), this.resetTeleport = function() {
        this.teleport = {
            icon: !1,
            col: 0,
            row: 0,
            phase: 0
        }
    }, this.resetTeleport(), this.resetExchange = function() {
        this.exchange = {
            icon1: !1,
            icon2: !1
        }
    }, this.resetExchange(), this.resetRevive = function() {
        this.revive = {
            deadIcons: !1,
            freeCharmedSquares: !1
        }
    }, this.resetRevive(), this.resetOnlineGame = function() {
        online.readyP1 = !1, online.readyP2 = !1, game.setMenu(game.startedBy)
    }, this.startNewGame = function(a) {
        isOnline() && 1 == online.playerNo && online.send({
            action: "setToggler",
            state: "small"
        }), Menu.setToggler("small"), game.startedBy = a, game.actualSide = a, game.enemySide = opp(a), game.circleStatus = "light" == game.startedBy ? 3 : 2, game.circleDirection = "light" == game.startedBy ? 1 : -1, game.cursor.x = "light" == game.actualSide ? 0 : 288, game.resetNextStep(), game.invertCycle = 0, game.alreadySummonedElemental = !1, game.gameEnded = !1, game.spells = {
            light: cloneObj(DATA.spells),
            dark: cloneObj(DATA.spells)
        }, game.resetFrameCounters(), game.setIcons(), game.scene = "table", borderColor(0), snd("ready" + ucFirst(game.actualSide))
    }, this.resetNextStep = function() {
        game.resetFrameCounters(), game.cursor.y = 86, game.resetCursorMove(), game.unsetSelectedIcon(), game.line1 = !1, game.line2 = !1, game.cannotMoveIcon = !1, game.resetTeleport(), game.resetExchange(), game.resetRevive(), game.icons[31].resetShapeshifter(), game.resetCombat(), game.spelling = !1, game.spellIndex = 0, borderColor(0)
    }, this.setIcons = function() {
        isOnline() && 1 == online.playerNo && online.send({
            action: "setIcons"
        }), game.icons = [];
        for (var a = 0; a < 7; a++) game.addIcon("knight", 1, 1 + a), game.addIcon("goblin", 7, 1 + a);
        game.addIcon("archer", 1, 0), game.addIcon("archer", 1, 8), game.addIcon("manticore", 7, 0), game.addIcon("manticore", 7, 8), game.addIcon("valkyrie", 0, 0), game.addIcon("valkyrie", 0, 8), game.addIcon("banshee", 8, 0), game.addIcon("banshee", 8, 8), game.addIcon("golem", 0, 1), game.addIcon("golem", 0, 7), game.addIcon("troll", 8, 1), game.addIcon("troll", 8, 7), game.addIcon("unicorn", 0, 2), game.addIcon("unicorn", 0, 6), game.addIcon("basilisk", 8, 2), game.addIcon("basilisk", 8, 6), game.addIcon("djinni", 0, 3), game.addIcon("shapeshifter", 8, 3), game.addIcon("phoenix", 0, 5), game.addIcon("dragon", 8, 5), game.addIcon("wizard", 0, 4), game.addIcon("sorceress", 8, 4)
    }, this.addIcon = function(a, b, c) {
        game.icons.push(new ArchonIcon(a, b, c, game.icons.length))
    }, this.getIconOnBoard = function(a, b) {
        if (a === !1 || b === !1 || a < 0 || a > 8 || b < 0 || b > 8) return !1;
        for (var c = 0; c < game.icons.length; c++) {
            var d = game.icons[c];
            if (!d.dead && d.col == a && d.row == b) return d
        }
        return !1
    }, this.getCursorIcon = function() {
        var a = game.getCursorRow(),
            b = game.getCursorCol();
        if (b === !1 || a === !1 || b < 0 || b > 8 || a < 0 || a > 8) return !1;
        var c = game.getIconOnBoard(b, a);
        return c
    }, this.cursorOnRow = function() {
        return !((Math.round(game.cursor.y) - 22) % 16)
    }, this.cursorOnCol = function() {
        return !(game.cursor.x % 24)
    }, this.cursorOnField = function() {
        return game.cursorOnRow() && game.cursorOnCol()
    }, this.getCursorCol = function() {
        if (!game.cursorOnCol()) return !1;
        var a = game.cursor.x / 24 - 2;
        return !(a < 0 || a > 8) && a
    }, this.getCursorRow = function() {
        return !!game.cursorOnRow() && (Math.round(game.cursor.y) - 22) / 16
    }, this.joyMoved = function(a) {
        0 !== a && 1 !== a && (a = !1);
        var b = getJoy(a);
        return b.up || b.down || b.left || b.right
    }, this.unsetSelectedIcon = function() {
        for (var a = 0; a < game.icons.length; a++) game.icons[a].selected = !1;
        game.selectedIcon = !1
    }, this.gameOver = function(a, b) {
        b && (game.line1 = "_alas, this icon is imprisoned"), "draw" == a ? game.line2 = "the game is ended...it is a tie" : game.line2 = "the game is ended...the " + a + " side wins", snd("music"), game.gameEnded = !0, game.delay(5)
    }, this.nextStep = function() {
        game.resetNextStep(), game.enemySide = game.actualSide, game.actualSide = opp(game.actualSide);
        var a = game.getIconOnBoard(4, 0),
            b = game.getIconOnBoard(4, 4),
            c = game.getIconOnBoard(4, 8),
            d = game.getIconOnBoard(0, 4),
            e = game.getIconOnBoard(8, 4);
        if (game.startedBy == game.actualSide && (a && a.heal1Hp(), b && b.heal1Hp(), c && c.heal1Hp(), d && d.heal1Hp(), e && e.heal1Hp(), 1 == game.invertCycle ? 0 == game.circleStatus ? (game.circleStatus = 5, game.circleDirection = -1) : 5 == game.circleStatus && (game.circleStatus = 0, game.circleDirection = 1) : ((0 == game.circleStatus && game.circleDirection == -1 || 5 == game.circleStatus && 1 == game.circleDirection) && (game.circleDirection *= -1), game.circleStatus += game.circleDirection), game.invertCycle = 0, 0 === game.circleStatus || 5 === game.circleStatus))
            for (var f = 0; f < game.icons.length; f++)(0 === game.circleStatus && "light" == game.icons[f].side || 5 === game.circleStatus && "dark" == game.icons[f].side) && (game.icons[f].imprisoned = !1, game.icons[f].heal1Hp());
        if (game.cursor.x = "light" == game.actualSide ? 0 : 288, a && b && c && d && e && a.side == b.side && b.side == c.side && c.side == d.side && d.side == e.side) return void game.gameOver(a.side);
        for (var g = {
                dark: 0,
                light: 0
            }, f = 0; f < game.icons.length; f++) {
            var h = game.icons[f];
            h.dead || g[h.side]++
        }
        if (!g.light && !g.dark) return void game.gameOver("draw");
        if (!g.light) return void game.gameOver("dark");
        if (!g.dark) return void game.gameOver("light");
        for (var i = 0, f = 0; f < game.icons.length; f++) {
            var h = game.icons[f];
            h.side == game.actualSide && (h.dead || h.imprisoned || i++)
        }
        return i ? void snd("ready" + ucFirst(game.actualSide)) : void game.gameOver(game.enemySide, !0)
    }, this.animateTable = function() {
        if (cls(), game.drawTable(), game.drawIcons(), "reviveChoose" == game.spelling)
            for (var a = 0; a < game.revive.deadIcons.length; a++) {
                var b = game.revive.deadIcons[a];
                draw(0, b.sprites.y + 2, 20, 16, "light" == game.actualSide ? 2 : 290, 24 + 16 * a)
            }
        if (game.drawPowerPoints(), "summonElemental" == game.spelling || "prepareCombat" == game.delayName && gfc("delay") < sec(.5) || game.drawCursor(), game.teleport.icon && game.teleport.phase > 0) {
            var b = game.teleport.icon,
                c = b.sprites,
                d = "light" == b.side ? "right" : "left";
            draw(c.move[d][0], c.y, 20, 18 - game.teleport.phase, 48 + 24 * b.col + 4, 24 + 16 * b.row - 1), draw(c.move[d][0], c.y + (18 - game.teleport.phase), 20, game.teleport.phase, 48 + 24 * game.teleport.col + 4, 24 + 16 * game.teleport.row + 17 - game.teleport.phase)
        }
        if (game.cannotMoveIcon && !game.selectedIcon) {
            var b = game.cannotMoveIcon;
            drawText(b.name + " (" + b.moveType + " " + b.maxSteps + ")", 81, 184), gfc("delay") <= sec(2.1) && (game.line2 = "alas, master, game icon cannot move")
        }
        if ("prepareCombat" == game.delayName && (game.line1 = !1), game.line1 && ("_" == game.line1[0] ? drawText(game.line1.substr(1), 1, 184) : drawText(game.line1, 81, 184)), "revivePlace" == game.spelling ? game.line2 = "place it within the charmed square" : "summonElemental" == game.spelling && ("summonElementalPowerPoint" == game.delayName ? game.line2 = "power points are proof against magic" : game.line2 = "send it to the target"), "prepareCombat" == game.delayName && (game.line2 = !1), game.line2 && drawText(game.line2, 1, 192), game.selectedIcon) {
            var b = game.selectedIcon;
            if (b.isMage()) "browse" == game.spelling ? game.line2 || drawText(game.spells[game.actualSide][game.spellIndex], 81, 192) : game.spelling || "prepareCombat" != game.delayName && drawText(b.name + " (" + b.moveType + " " + b.maxSteps + ")", 81, 184);
            else {
                "revivePlace" != game.spelling && "summonElemental" != game.spelling && "prepareCombat" != game.delayName && drawText(b.name + " (" + b.moveType + " " + b.maxSteps + ")", 81, 184);
                var d = diagonalDirection(b.d);
                draw(b.sprites.move[d][b.animationPhase], b.sprites.y, 20, 18, b.x, b.y)
            }
        }
        if (!isOnline() && !game.ctrlTexts[game.actualSide]) switch (game.line1 = "_" + game.actualSide + ": USE ", engine.options[game.actualSide + "Control"]) {
            case "keyboardArrows":
                game.line1 += "ARROW KEYS AND ENTER";
                break;
            case "keyboardWasd":
                game.line1 += "WASD KEYS AND LEFT SHIFT";
                break;
            case "gamepad":
                game.line1 += "THE GAMEPAD"
        }
    }, this.drawTable = function() {
        ("prepareCombat" != game.delayName || "prepareCombat" == game.delayName && gfc("delay") > sec(.5)) && ("light" == game.actualSide ? draw(217, 306, 92, 7, 110, 6) : draw(309, 306, 92, 7, 110, 6)), rect(40, 16, 232, 160, "light" == game.actualSide ? 7 : 14), rect(48, 24, 216, 144, DATA.circleColors[game.circleStatus]);
        for (var a = 0; a < 2; a++) {
            fillStyle(a);
            for (var b = 0; b < 9; b++)
                for (var c = 0; c < 9; c++) DATA.board[b][c] == a && rect(48 + 24 * c, 24 + 16 * b, 24, 16, !1)
        }
    }, this.drawIcons = function() {
        for (var a = 0; a < game.icons.length; a++) {
            var b = game.icons[a];
            b.dead || b.selected && !b.isMage() || game.teleport.icon == b && game.teleport.phase > 0 || "exchange3" == game.spelling && (game.exchange.icon1 == b || game.exchange.icon2 == b) || "prepareCombat" == game.delayName && b !== game.combat.icons.light && b !== game.combat.icons.dark || draw(0, b.sprites.y + 2, 20, 16, 48 + 24 * b.col + 2, 24 + 16 * b.row)
        }
    }, this.drawPowerPoints = function() {
        if (!("prepareCombat" == game.delayName && gfc("delay") < sec(.5))) switch (engine.animationFrameCounter % 5) {
            case 0:
                draw(217, 313, 12, 7, 150, 28);
                break;
            case 1:
                draw(217, 313, 12, 7, 54, 92);
                break;
            case 2:
                draw(217, 313, 12, 7, 150, 92);
                break;
            case 3:
                draw(217, 313, 12, 7, 150, 156);
                break;
            case 4:
                draw(217, 313, 12, 7, 246, 92)
        }
    }, this.drawCursor = function() {
        var a = game.cursor;
        fillStyle("light" == game.actualSide ? 7 : 14), rect(a.x, a.y, 26, 2, !1), rect(a.x, a.y + 18, 26, 2, !1), rect(a.x, a.y + 2, 4, 16, !1), rect(a.x + 22, a.y + 2, 4, 16, !1)
    }, this.scanTable = function() {
        if (game.gameEnded) return void[112, 113, 114, 115, 116, 117, 118, 119, 27, 13, 32, 16].forEach(function(a) {
            engine.pressedKeys[a] === !0 && (hold(a), game.resetOnlineGame())
        });
        var a = "powerPointRestriction";
        if (gfc(a) > 0) {
            var b = ifc(a);
            return void(b == sec(2) ? (rfc(a), sfc("cancelSpell", 1.5)) : 2 == b && (game.line2 = "power points are proof against magic"))
        }
        var a = "cancelSpell";
        if (gfc(a) > 0) {
            var b = dfc(a);
            return void(b == sec(1.5) - 1 ? (game.line1 = "_spell is canceled. choose another", game.line2 = !1) : 0 == b && (rfc(a), game.startBrowsingSpells()))
        }
        var a = "teleportAnimation";
        if (gfc(a) > 0) {
            var b = ifc(a);
            if (2 == b) snd("teleport");
            else if (b == sec(1.8)) {
                game.spelling && game.spellSuccess(0), rfc(a);
                var c = game.getIconOnBoard(game.teleport.col, game.teleport.row);
                c ? game.prepareCombat(c, game.teleport.icon, game.teleport.col, game.teleport.row) : (game.teleport.icon.col = game.teleport.col, game.teleport.icon.row = game.teleport.row, game.unsetSelectedIcon(), game.nextStep())
            }
            for (var d = 0; d < 17; d++) b == sec(d / 10) && (game.teleport.phase = d + 1)
        } else {
            if (isOnline()) var e = getJoy(online.sideP1 == game.actualSide ? 0 : 1);
            else {
                var e = getJoy();
                !game.ctrlTexts[game.actualSide] && (e.left || e.right || e.up || e.down) && (game.line1 = !1, game.ctrlTexts[game.actualSide] = !0)
            }
            if (game.selectedIcon && !game.selectedIcon.isMage()) {
                var c = game.selectedIcon;
                if (c.onField() && e.fire === !0 && !game.joyMoved()) {
                    hold("fire");
                    var f = c.getCol(),
                        g = c.getRow(),
                        h = game.getIconOnBoard(f, g);
                    if (c.stopStep(), game.resetCursorMove(), "revivePlace" == game.spelling) {
                        for (var i = !1, d = 0; d < game.revive.freeCharmedSquares.length; d++) game.revive.freeCharmedSquares[d].col == f && game.revive.freeCharmedSquares[d].row == g && (i = !0);
                        if (!i) return;
                        return game.spellSuccess(5), c.afterReviving(g, f), game.unsetSelectedIcon(), void game.nextStep()
                    }
                    if ("summonElemental" == game.spelling) {
                        if (isPowerPoint(f, g)) game.delay(2, !1, "summonElementalPowerPoint");
                        else {
                            if (!h) return !1;
                            if (h.side == game.actualSide) return !1;
                            game.spellSuccess(4), game.prepareCombat(game.selectedIcon, h, f, g)
                        }
                        return
                    }
                    if (c.col == f && c.row == g) return;
                    if (h && h.side == game.actualSide) return;
                    if (h && h.side == game.enemySide) return void game.prepareCombat(h, game.selectedIcon, f, g);
                    if (!h) return c.row = g, c.col = f, game.unsetSelectedIcon(), void game.nextStep()
                }
                if (0 == c.canFly) {
                    var j = !0;
                    if (c.onField() && game.joyMoved()) {
                        var k = c.getRow(),
                            l = c.getCol(),
                            m = k,
                            n = l;
                        e.up && k > 0 ? m-- : e.down && k < 8 ? m++ : e.left && l > 0 ? n-- : e.right && l < 8 && n++;
                        var o = game.getIconOnBoard(l, k);
                        !o || o.side != game.enemySide || n == c.prevCol && m == c.prevRow || (game.line2 = "do you challenge game foe?", j = !1);
                        var p = !0;
                        if (j) {
                            var q = !1;
                            game.groundSteps.length && (q = game.groundSteps[game.groundSteps.length - 1]), q && m == q.row && n == q.col && (game.groundSteps.pop(), p = !1), game.groundSteps.length == c.maxSteps && (game.line2 = "you have moved your limit", j = !1)
                        }
                        if (j) {
                            var r = game.getIconOnBoard(n, m);
                            r && r.side == game.actualSide && !r.selected && (game.line2 = "the square ahead is occupied", j = !1)
                        }
                        if (j && (e.up && k <= 0 ? j = !1 : e.down && k >= 8 ? j = !1 : e.left && l <= 0 ? j = !1 : e.right && l >= 8 && (j = !1)), j) {
                            if (p) {
                                var q = !1;
                                game.groundSteps.length && (q = game.groundSteps[game.groundSteps.length - 1]), q && q.col == l && q.row == k || game.groundSteps.push({
                                    row: k,
                                    col: l
                                })
                            }
                            game.line2 = !1, game.resetCursorMove(), e.up ? game.cursorMove.up = !0 : e.down ? game.cursorMove.down = !0 : e.left ? game.cursorMove.left = !0 : e.right && (game.cursorMove.right = !0), c.savePreviousPos(), c.startStep()
                        }
                    }!c.onField() || game.joyMoved() && j || (game.resetCursorMove(), c.stopStep())
                } else {
                    var s = [];
                    if ((c.onRow() || c.onCol()) && game.joyMoved()) {
                        var k = c.getRow(),
                            m = k,
                            l = c.getCol(),
                            n = l;
                        c.onRow() && (e.up && k > 0 ? m-- : e.down && k < 8 && m++, e.up && k <= 0 ? s.push("up") : e.down && k >= 8 && s.push("down")), c.onCol() && (e.left && l > 0 ? n-- : e.right && l < 8 && n++, e.left && l <= 0 ? s.push("left") : e.right && l >= 8 && s.push("right"));
                        var t = 0;
                        c.onRow() && Math.abs(c.row - m) > c.maxSteps && e.up ? (s.push("up"), t++) : c.onRow() && Math.abs(c.row - m) > c.maxSteps && e.down && (s.push("down"), t++), c.onCol() && Math.abs(c.col - n) > c.maxSteps && e.left ? (s.push("left"), t++) : c.onCol() && Math.abs(c.col - n) > c.maxSteps && e.right && (s.push("right"), t++), s.length < 2 && (e.up ? (game.cursorMove.up = !0, game.cursorMove.down = !1) : e.down && (game.cursorMove.down = !0, game.cursorMove.up = !1), e.left ? (game.cursorMove.left = !0, game.cursorMove.right = !1) : e.right && (game.cursorMove.right = !0, game.cursorMove.left = !1))
                    }!c.onCol() || e.left && s.indexOf("left") === -1 || (game.cursorMove.left = !1), !c.onCol() || e.right && s.indexOf("right") === -1 || (game.cursorMove.right = !1), !c.onRow() || e.up && s.indexOf("up") === -1 || (game.cursorMove.up = !1), !c.onRow() || e.down && s.indexOf("down") === -1 || (game.cursorMove.down = !1), t && 0 == game.cursorMove.left && 0 == game.cursorMove.right && 0 == game.cursorMove.up && 0 == game.cursorMove.down && (game.line2 = "you have moved your limit"), 1 != game.cursorMove.left && 1 != game.cursorMove.right && 1 != game.cursorMove.up && 1 != game.cursorMove.down || (game.line2 = !1, c.onField() && c.startStep()), c.onField() && (!game.joyMoved() || 0 == game.cursorMove.left && 0 == game.cursorMove.right && 0 == game.cursorMove.up && 0 == game.cursorMove.down) && c.stopStep()
                }
                var u = (100 == c.speed ? 100 : 50) / 100;
                return game.cursorMove.up && game.cursorMove.left ? (c.d = "leftUp", c.y -= 1 * u, c.x -= 2 * u) : game.cursorMove.up && game.cursorMove.right ? (c.d = "rightUp", c.y -= 1 * u, c.x += 2 * u) : game.cursorMove.down && game.cursorMove.left ? (c.d = "leftDown", c.y += 1 * u, c.x -= 2 * u) : game.cursorMove.down && game.cursorMove.right ? (c.d = "rightDown", c.y += 1 * u, c.x += 2 * u) : game.cursorMove.up ? (c.d = "up", c.y -= 1 * u) : game.cursorMove.down ? (c.d = "down", c.y += 1 * u) : game.cursorMove.left ? (c.d = "left", c.x -= 2 * u) : game.cursorMove.right && (c.d = "right", c.x += 2 * u), void((game.cursorMove.up || game.cursorMove.down || game.cursorMove.left || game.cursorMove.right) && c.stepAnimationPhase())
            }
            if (game.selectedIcon && game.selectedIcon.isMage() && "browse" == game.spelling)
                if (e.up === !0) {
                    hold("up");
                    do game.spellIndex--, game.spellIndex < 0 && (game.spellIndex = 7);
                    while (game.spells[game.actualSide][game.spellIndex] === !1)
                }
            else if (e.down === !0) {
                hold("down");
                do game.spellIndex++, game.spellIndex > 7 && (game.spellIndex = 0);
                while (game.spells[game.actualSide][game.spellIndex] === !1)
            } else e.fire === !0 && (hold("fire"), game.castSpell(game.spellIndex));
            else if (game.selectedIcon && game.selectedIcon.isMage() && !game.spelling && game.cursorOnField() && e.fire === !0) {
                hold("fire");
                var l = game.getCursorCol(),
                    k = game.getCursorRow(),
                    c = game.getIconOnBoard(l, k);
                if (!c || c && c.side == game.enemySide) return game.teleport = {
                    icon: game.selectedIcon,
                    col: l,
                    row: k,
                    phase: 0
                }, void sfc("teleportAnimation");
                if (c && c.side == game.actualSide && !c.isMage()) return;
                if (c && c.side == game.actualSide && c.isMage()) return void game.startBrowsingSpells()
            } else {
                if (!game.selectedIcon && game.cursorOnField() && e.fire === !0 && !game.joyMoved()) {
                    hold("fire");
                    var l = game.getCursorCol(),
                        k = game.getCursorRow(),
                        c = game.getIconOnBoard(l, k);
                    c && c.side == game.actualSide && c.imprisoned ? game.line2 = "alas, game icon is imprisoned" : c && c.side == game.actualSide && !c.isMage() ? c.canStartMove() ? (c.selected = !0, c.d = "light" == c.side ? "right" : "left", c.x = 48 + 24 * l + 4, c.y = 24 + 16 * k - 1, game.selectedIcon = c, game.groundSteps = []) : (game.cannotMoveIcon = c, game.delay(2.5, function() {
                        game.cannotMoveIcon = !1, game.line2 = !1, snd("ready" + ucFirst(game.actualSide))
                    })) : c && c.side == game.actualSide && c.isMage() && (c.selected = !0, game.selectedIcon = c)
                }
                if (!game.selectedIcon || game.selectedIcon.isMage() && (!game.spelling || "browse" != game.spelling)) {
                    if (game.cursorOnRow() && (e.up && game.cursor.y > 22 ? game.cursorMove.up = !0 : e.down && game.cursor.y < 150 && (game.cursorMove.down = !0)), game.cursorOnCol() && "reviveChoose" !== game.spelling && (e.left && game.cursor.x > 48 ? game.cursorMove.left = !0 : e.right && game.cursor.x < 240 && (game.cursorMove.right = !0)), game.selectedIcon && game.selectedIcon.isMage() && game.spelling && "browse" != game.spelling && game.cursorOnField() && e.fire === !0) return hold("fire"), void game.doSpellFrameAction();
                    if (game.selectedIcon && game.selectedIcon.isMage() && !game.spelling) {
                        var c = game.selectedIcon,
                            g = game.getCursorRow(),
                            f = game.getCursorCol(),
                            v = !0,
                            w = !0;
                        game.cursorOnRow() && (e.up && Math.abs(c.row - (g - 1)) > c.maxSteps ? v = !1 : e.down && Math.abs(c.row - (g + 1)) > c.maxSteps && (v = !1), v || (game.cursorMove.up = !1, game.cursorMove.down = !1)), game.cursorOnCol() && (e.left && Math.abs(c.col - (f - 1)) > c.maxSteps ? w = !1 : e.right && Math.abs(c.col - (f + 1)) > c.maxSteps && (w = !1), w || (game.cursorMove.left = !1, game.cursorMove.right = !1)), (v || w) && (v || e.left || e.right) && (w || e.up || e.down) || (game.line2 = "you have moved your limit"), (v && (e.up || e.down) || w && (e.left || e.right)) && (game.line2 = !1)
                    }
                    game.cursorMove.up && (game.cursor.y -= 2 * (16 / 24)), game.cursorMove.down && (game.cursor.y += 2 * (16 / 24)), game.cursorMove.left && (game.cursor.x -= 2), game.cursorMove.right && (game.cursor.x += 2), (game.cursorMove.up || game.cursorMove.down || game.cursorMove.left || game.cursorMove.right) && !game.selectedIcon && (game.line2 = !1), game.cursorOnRow() && (game.cursorMove.up = !1, game.cursorMove.down = !1, game.cursor.y = Math.round(game.cursor.y)), game.cursorOnCol() && (game.cursorMove.left = !1, game.cursorMove.right = !1, game.cursor.x = Math.round(game.cursor.x))
                }
            }
        }
    }, this.doSpellFrameAction = function() {
        var a = game.getCursorRow(),
            b = game.getCursorCol(),
            c = game.getIconOnBoard(b, a);
        if ("heal" == game.spelling) {
            if (!c) return !1;
            if (c.onPowerPoint()) sfc("powerPointRestriction");
            else {
                if (c.side == game.enemySide) return !1;
                game.line2 = "it is done", game.delay(2.1, function() {
                    game.spellSuccess(1), game.getCursorIcon().heal(), game.nextStep()
                })
            }
        } else if ("teleport1" == game.spelling) {
            if (!c) return !1;
            if (c.onPowerPoint()) sfc("powerPointRestriction");
            else {
                if (c.side == game.enemySide) return !1;
                c.side == game.actualSide && c.imprisoned === !0 ? (game.line2 = "alas, game icon is imprisoned", game.delay(2, function() {
                    sfc("cancelSpell", 1.5)
                })) : c.side == game.actualSide && (game.teleport.icon = c, game.line2 = "where will you teleport it?", game.spelling = "teleport2")
            }
        } else if ("teleport2" == game.spelling) isPowerPoint(b, a) ? sfc("powerPointRestriction") : (!c || c && c.side == game.enemySide) && (game.teleport.col = b, game.teleport.row = a, sfc("teleportAnimation"));
        else if ("exchange1" == game.spelling) {
            if (!c) return !1;
            c.onPowerPoint() ? sfc("powerPointRestriction") : c.imprisoned ? (game.line2 = "alas, game icon is imprisoned", game.delay(2, function() {
                sfc("cancelSpell", 1.5)
            })) : (game.exchange.icon1 = c, game.line2 = "exchange it with which icon?", game.spelling = "exchange2")
        } else if ("exchange2" == game.spelling) {
            if (!c) return !1;
            if (c.onPowerPoint()) sfc("powerPointRestriction");
            else {
                if (c == game.exchange.icon1) return !1;
                c.imprisoned ? (game.line2 = "alas, game icon is imprisoned", game.delay(2, function() {
                    sfc("cancelSpell", 1.5)
                })) : (game.exchange.icon2 = c, game.line1 = !1, game.line2 = !1, game.spelling = "exchange3", game.delay(1, function() {
                    game.spelling && game.spellSuccess(3);
                    var a = game.exchange.icon1.col,
                        b = game.exchange.icon1.row;
                    game.exchange.icon1.col = game.exchange.icon2.col, game.exchange.icon1.row = game.exchange.icon2.row, game.exchange.icon2.col = a, game.exchange.icon2.row = b, game.nextStep()
                }))
            }
        } else if ("imprison" == game.spelling) {
            if (!c) return !1;
            if (c.onPowerPoint()) sfc("powerPointRestriction");
            else {
                if (c.side == game.actualSide) return !1;
                c.imprisoned = !0, game.line2 = "it is done", game.delay(2.1, function() {
                    game.spellSuccess(6), game.nextStep()
                })
            }
        } else if ("reviveChoose" == game.spelling) {
            if (!game.cursorOnRow()) return !1;
            var a = game.getCursorRow();
            if (game.revive.deadIcons.length < a + 1) return !1;
            game.selectedIcon = game.revive.deadIcons[a], game.selectedIcon.reviving(a), game.spelling = "revivePlace"
        }
    }, this.castSpell = function(a) {
        switch (a) {
            case 0:
                game.line1 = "teleport", game.line2 = "which icon will you teleport?", game.resetTeleport(), game.spelling = "teleport1";
                break;
            case 1:
                game.line1 = "heal", game.line2 = "which icon will you heal?", game.spelling = "heal";
                break;
            case 2:
                game.line1 = "shift time", game.line2 = "the flow of time is reversed", game.delay(2.1, function() {
                    game.spellSuccess(2), 0 == game.circleStatus ? game.invertCycle++ : 5 == game.circleStatus ? game.invertCycle++ : game.circleDirection *= -1, game.nextStep()
                });
                break;
            case 3:
                game.line1 = "exchange", game.line2 = "choose an icon to transpose", game.resetExchange(), game.spelling = "exchange1";
                break;
            case 4:
                if (game.spelling = "summonElemental", !game.getSpellableEnemyIcons(game.actualSide).length) return game.spelling = "summonElementalError", game.line1 = "summon elemental", void sfc("powerPointRestriction");
                var b = "";
                do switch (rnd(4)) {
                    case 1:
                        b = "airElemental", game.line1 = "_an air";
                        break;
                    case 2:
                        b = "fireElemental", game.line1 = "_a fire";
                        break;
                    case 3:
                        b = "earthElemental", game.line1 = "_an earth";
                        break;
                    case 4:
                        b = "waterElemental", game.line1 = "_a water"
                }
                while (game.alreadySummonedElemental === b);
                game.alreadySummonedElemental = b, game.line1 += " elemental appears!", game.icons.push(new ArchonIcon(b, -1, 4, game.icons.length)), game.selectedIcon = game.icons[game.icons.length - 1], game.selectedIcon.d = "light" == game.actualSide ? "right" : "left", game.selectedIcon.x = "light" == game.actualSide ? 4 : 292, game.selectedIcon.y = 87, game.selectedIcon.selected = !0, isOnline() && 1 == online.playerNo && online.send({
                    action: "createElemental",
                    type: b,
                    col: game.selectedIcon.col,
                    row: game.selectedIcon.row,
                    d: game.selectedIcon.d,
                    x: game.selectedIcon.x,
                    y: game.selectedIcon.y
                });
                break;
            case 5:
                game.spelling = "revive";
                var c = game.getDeadIcons(game.actualSide),
                    d = game.getFreeCharmedSquares(game.actualSide);
                c.length ? d.length ? (game.line1 = "revive", game.line2 = "what icon will you revive?", game.revive = {
                    deadIcons: c,
                    freeCharmedSquares: d
                }, game.cursor.x = "light" == game.actualSide ? 0 : 288, game.cursor.y = 150, game.spelling = "reviveChoose") : (game.line1 = "_alas, master, there is no opening in the", game.line2 = "charmed square. conjure another spell", game.delay(3, function() {
                    sfc("cancelSpell", 1.5)
                })) : (game.line1 = "_happily, master, all your icons live.", game.line2 = "please conjure a different spell", game.delay(3, function() {
                    sfc("cancelSpell", 1.5)
                }));
                break;
            case 6:
                game.spelling = "imprison", game.line1 = "imprison", "dark" == game.selectedIcon.side && 0 == game.circleStatus || "light" == game.selectedIcon.side && 5 == game.circleStatus ? (game.line2 = "that spell would be wasted at game time", game.delay(2, function() {
                    game.line1 = !1, game.line2 = !1, sfc("cancelSpell", 1.5)
                })) : game.line2 = "which foe will you imprison?";
                break;
            case 7:
                game.line1 = "cease conjuring", game.line2 = "it is done", game.delay(2.1, function() {
                    game.line1 = !1, game.line2 = !1, game.spelling = !1, game.unsetSelectedIcon(), snd("ready" + ucFirst(game.actualSide))
                })
        }
    }, this.startBrowsingSpells = function() {
        game.line1 = "select a spell", game.spelling = "browse", game.spellIndex = -1;
        do game.spellIndex++;
        while (game.spells[game.actualSide][game.spellIndex] === !1)
    }, this.spellSuccess = function(a) {
        game.spells[game.actualSide][a] = !1
    }, this.getDeadIcons = function(a) {
        for (var b = [], c = 0; c < game.icons.length; c++)
            if (game.icons[c].side == a && game.icons[c].dead === !0 && !game.icons[c].isElemental()) {
                for (var d = !0, e = 0; e < b.length; e++) b[e].type == game.icons[c].type && (d = !1);
                d && b.push(game.icons[c])
            }
        return b
    }, this.getFreeCharmedSquares = function(a) {
        var b = [],
            c = game.getMage(a);
        if (!c) return b;
        for (var d = c.row - 1; d <= c.row + 1; d++)
            for (var e = c.col - 1; e <= c.col + 1; e++)
                if (!(d < 0 || d > 8 || e < 0 || e > 8 || d == c.row && e == c.col || isPowerPoint(e, d))) {
                    var f = game.getIconOnBoard(e, d);
                    f || b.push({
                        col: e,
                        row: d
                    })
                }
        return b
    }, this.getSpellableEnemyIcons = function(a) {
        for (var b = [], c = 0; c < game.icons.length; c++) game.icons[c].side == a && game.icons[c].dead === !1 && b.push(game.icons[c]);
        return b
    }, this.getMage = function(a) {
        for (var b = 0; b < game.icons.length; b++)
            if (game.icons[b].side == a && game.icons[b].isMage() && game.icons[b].dead === !1) return game.icons[b];
        return !1
    }, this.prepareCombat = function(a, b, c, d) {
        var e = "light" == a.side || "dark" == b.side ? a : b,
            f = "dark" == a.side || "light" == b.side ? a : b;
        "light" == e.side && e.setCombatHp(c, d), "dark" == f.side && f.setCombatHp(c, d), "elemental" == e.side && (e.side = "light"), "elemental" == f.side && (f.side = "dark"), e.d = "right", e.x = 48 + 24 * c + 4, e.y = 24 + 16 * d - 1, f.d = "left", f.x = 48 + 24 * c + 4, f.y = 24 + 16 * d - 1;
        var g = 0;
        switch (DATA.board[d][c]) {
            case "0":
                g = 11;
                break;
            case "1":
                g = 1;
                break;
            case "2":
                g = 5 == game.circleStatus ? 11 : DATA.circleColors[game.circleStatus]
        }
        for (var h = [], i = 0; i < 18; i++) {
            for (var j = rnd(8), k = rnd(6), l = !0, m = 0; m < h.length; m++) h[m].col == j && h[m].row == k && (l = !1);
            if (l) {
                var n = Math.ceil((i + 1) / 6);
                h.push({
                    col: j,
                    row: k,
                    x: 44 + 32 * (j - 1),
                    y: 18 + 32 * (k - 1),
                    type: n,
                    phase: [3, 2, 7][n - 1],
                    dir: [-1, 1, -1][n - 1]
                })
            } else i--
        }
        game.combat.col = c, game.combat.row = d, game.combat.icons = {
            light: e,
            dark: f
        }, game.combat.borderColor = g, game.combat.barriers = h, game.delay(1.5, function() {
            game.combat.icons.dark.shapeshifter === !0 && (game.makeShapeshifter(game.combat.icons.light, game.combat.icons.dark), isOnline() && online.send({
                action: "makeShapeshifter",
                light: game.combat.icons.light._num,
                dark: game.combat.icons.dark._num
            })), borderColor(game.combat.borderColor), game.scene = "combat"
        }, "prepareCombat")
    }, this.resetCombat = function() {
        this.combat = {
            status: "pre1",
            col: !1,
            row: !1,
            icons: {
                light: !1,
                dark: !1
            },
            borderColor: !1,
            barriers: [],
            firing: {
                light: !1,
                dark: !1
            },
            attackRate: {
                light: 0,
                dark: 0
            },
            bullet: {
                light: !1,
                dark: !1
            },
            damage: {
                light: 0,
                dark: 0
            }
        }
    }, this.resetCombat(), this.animateCombat = function() {
        if (cls(game.combat.borderColor), "pre1" == game.combat.status || "combatAfter" == game.delayName ? (rect(0, 0, 320, 200, game.combat.borderColor), rect(48, 24, 216, 144, 0)) : ["pre2", "combat", "end"].indexOf(game.combat.status) !== -1 && rect(8, 16, 304, 176, 0), "combat" == game.combat.status)
            for (var a = 0; a < 18; a++) {
                var b = game.combat.barriers[a];
                1 == b.type && 7 != b.phase ? draw(377 + 10 * b.phase, 313, 10, 12, b.x, b.y) : 2 == b.type && 7 != b.phase ? draw(377 + 10 * b.phase, 325, 10, 12, b.x, b.y) : 3 == b.type && 7 != b.phase && draw(377 + 10 * b.phase, 337, 10, 12, b.x, b.y)
            }
        "combat" == game.combat.status && (game.combat.icons.light.hp > 0 && rect(0, 192, 8, 8 * -game.combat.icons.light.hp, 7), game.combat.icons.dark.hp > 0 && rect(312, 192, 8, 8 * -game.combat.icons.dark.hp, 14), ["light", "dark"].forEach(function(a) {
            var b = game.combat.bullet[a];
            if (b !== !1) {
                if (b.animated === !0 && draw(b.phases[b.phase].x, b.phases[b.phase].y, b.w, b.h, b.posX, b.posY), "scream" === b.type) {
                    var c = game.combat.icons[a];
                    draw(b.sprite.x, b.sprite.y, b.sprite.w, b.sprite.h, c.x - 12, c.y - 13)
                }
                if ("fire" === b.type) {
                    var c = game.combat.icons[a],
                        d = b.phases;
                    b.phase < 10 || b.phase >= 40 ? draw(d[0].x, d[0].y, d[0].w, d[0].h, c.x, c.y) : b.phase < 20 || b.phase >= 30 ? draw(d[1].x, d[1].y, d[1].w, d[1].h, c.x - 4, c.y - 3) : b.phase < 30 && draw(d[2].x, d[2].y, d[2].w, d[2].h, c.x - 12, c.y - 7)
                } else draw(b.x, b.y, b.w, b.h, b.posX, b.posY)
            }
        })), ["dark", "light"].forEach(function(a) {
            if (!game.isDead(a)) {
                var b = game.combat.icons[a];
                if (game.combat.firing[a] && "banshee" != b.type) "phoenix" != b.type && draw(b.sprites.shot[b.d], b.sprites.y, 20, 18, b.x, b.y);
                else {
                    var c = diagonalDirection(b.d);
                    draw(b.sprites.move[c][b.animationPhase], b.sprites.y, 20, 18, b.x, b.y)
                }
            }
        })
    }, this.scanCombat = function() {
        if ("pre1" == game.combat.status) game.scanCombatPre1();
        else if ("pre2" == game.combat.status) game.scanCombatPre2();
        else if ("end" == game.combat.status) game.scanCombatEnd();
        else if ("combat" == game.combat.status) {
            ifc("combat"), (game.combat.icons.light.hp <= 0 || game.combat.icons.dark.hp <= 0) && 0 == gfc("combatEnd") && sfc("combatEnd", 1.5);
            var a = "combatEnd";
            if (gfc(a) > 0 && (dfc(a), 0 == gfc(a))) return game.combat.status = "end", game.combat.firing.light = !1, game.combat.firing.dark = !1, engine.audio.stopAllSound(), void game.delay(1, function() {
                game.combat.icons.light.d = "right", game.combat.icons.dark.d = "left", game.combat.icons.light.stopStep(), game.combat.icons.dark.stopStep(), game.combat.icons.light.injuries += Math.max(0, game.combat.damage.light - game.getHpBonus(game.combat.col, game.combat.row, "light")), game.combat.icons.dark.injuries += Math.max(0, game.combat.damage.dark - game.getHpBonus(game.combat.col, game.combat.row, "dark"))
            });
            ["light", "dark"].forEach(function(a) {
                game.isDead(a) || game.combat.attackRate[a] > 0 && (game.combat.attackRate[a]--, 0 == game.combat.attackRate[a] && snd("ready" + ucFirst(a)))
            }), game.scanBullets(), game.scanBarriers(), game.scanIcons()
        }
    }, this.scanCombatPre1 = function() {
        var a = !0,
            b = [88, 104],
            c = [52, 242];
        ["light", "dark"].forEach(function(d, e) {
            var f = game.combat.icons[d];
            if (f.x != c[e] || f.y != b[e]) {
                a = !1;
                var g = Math.min(2, Math.abs(b[e] - f.y));
                f.y += f.y > b[e] ? -g : g, g = Math.min(2, Math.abs(c[e] - f.x)), f.x += f.x > c[e] ? -g : g
            }
        }), a && game.delay(.7, function() {
            game.combat.status = "pre2"
        })
    }, this.scanCombatPre2 = function() {
        var a = !0,
            b = [18, 290];
        ["light", "dark"].forEach(function(c, d) {
            var e = game.combat.icons[c];
            if (e.x != b[d]) {
                a = !1;
                var f = Math.min(2, Math.abs(b[d] - e.x));
                e.x += e.x > b[d] ? -f : f
            }
        }), a && (sfc("combat"), game.combat.status = "combat")
    }, this.scanCombatEnd = function() {
        if (game.combat.icons.light.isElemental() && game.combat.icons.light.kill(), game.combat.icons.dark.isElemental() && game.combat.icons.dark.kill(), game.isDead("light") && game.isDead("dark")) return game.scene = "table", void game.nextStep();
        var a = 48 + 24 * game.combat.col + 4,
            b = 24 + 16 * game.combat.row - 1;
        ["light", "dark"].forEach(function(c) {
            if (!game.isDead(c)) {
                var d = game.combat.icons[c];
                if (d.x == a && d.y == b) return d.col = game.combat.col, d.row = game.combat.row, void game.delay(1.1, function() {
                    game.scene = "table", game.nextStep()
                }, "combatAfter");
                var e = Math.min(2, Math.abs(b - d.y));
                d.y += d.y > b ? -e : e, e = Math.min(2, Math.abs(a - d.x)), d.x += d.x > a ? -e : e
            }
        })
    }, this.scanBullets = function() {
        ["light", "dark"].forEach(function(a) {
            var b = game.combat.icons[a],
                c = game.combat.bullet[a];
            if (c !== !1) {
                if (game.combat.bullet[a].remove === !0) return game.combat.bullet[a] = !1, game.combat.firing[a] = !1, void engine.audio.stop(game.combat.icons[a].prop.sounds.fire, a);
                if (game.isDead(a) && ["banshee", "phoenic", "knight", "goblin"].indexOf(b.type) !== -1) return void game.removeBullet(a);
                if ("goblin" == b.type || "knight" == b.type) {
                    if (c.phase += c.slow ? .5 : 1, c.phase >= sec(.28)) return void game.removeBullet(a)
                } else if (!c.type) {
                    var d = b.prop.shotSpeed;
                    c.slow && (d *= .5), "leftUp" == c.d ? (c.posY -= d / 2, c.posX -= d) : "rightUp" == c.d ? (c.posY -= d / 2, c.posX += d) : "leftDown" == c.d ? (c.posY += d / 2, c.posX -= d) : "rightDown" == c.d ? (c.posY += d / 2, c.posX += d) : "up" == c.d ? c.posY -= d / 2 : "down" == c.d ? c.posY += d / 2 : "left" == c.d ? c.posX -= d : "right" == c.d && (c.posX += d)
                }
                if (c.slow = !1, c.animated === !0 && (c.phase++, c.phase == c.phases.length && (c.phase = 0)), "scream" === c.type) {
                    if (c.phase++, c.phase == sec(.79)) return void game.removeBullet(a)
                } else if ("fire" === c.type && (c.phase++, c.phase == sec(1))) return void game.removeBullet(a);
                if (!c.type && "goblin" != b.type && "knight" != b.type && (c.posX < 8 || c.posX + c.w > 316 || c.posY < 12 || c.posY + c.h > 194)) return void game.removeBullet(a);
                if (!c.type) {
                    var e, f;
                    c.animated === !0 ? (e = c.phases[c.phase].x, f = c.phases[c.phase].y) : (e = c.x, f = c.y);
                    for (var g = 0; g < 18; g++) {
                        var h = game.combat.barriers[g];
                        if (7 != h.phase && boxCollision(h.x, h.y, 10, 12, c.posX, c.posY, c.w, c.h) && spriteCollision(377 + 10 * h.phase, 313 + 12 * (h.type - 1), 10, 12, e, f, c.w, c.h, c.posX - h.x, c.posY - h.y)) {
                            if (6 != h.phase) return void game.removeBullet(a);
                            c.slow = !0;
                            break
                        }
                    }
                }
                if (!game.isDead(opp(a))) {
                    var i = game.combat.icons[opp(a)];
                    if ("phoenix" == i.type && game.combat.firing[opp(a)]);
                    else {
                        var j = game.combat.firing[opp(a)] && i.sprites.shot ? i.sprites.shot[i.d] : i.sprites.move[diagonalDirection(i.d)][i.animationPhase];
                        if ("banshee" == b.type) boxCollision(i.x, i.y, 20, 18, b.x - 12, b.y - 13, c.sprite.w, c.sprite.h) && (boxCollision(i.x, i.y, 20, 18, b.x, b.y, 25, 20) || spriteCollision(j, i.sprites.y, 20, 18, c.sprite.x, c.sprite.y, c.sprite.w, c.sprite.h, b.x - 12 - i.x, b.y - 13 - i.y)) && [1, 8, 14, 19, 23, 27, 33, 39].indexOf(c.phase) !== -1 && game.doDamage(i, b.prop.dmg);
                        else if ("phoenix" == b.type) {
                            var e, f, k, l, m;
                            c.phase < 10 || c.phase >= 40 ? (e = b.x, f = b.y, k = 20, l = 17, m = 0) : c.phase < 20 || c.phase >= 30 ? (e = b.x - 4, f = b.y - 3, k = 24, l = 21, m = 1) : c.phase < 30 && (e = b.x - 12, f = b.y - 7, k = 48, l = 42, m = 2), boxCollision(i.x, i.y, 20, 18, e, f, k, l) && spriteCollision(j, i.sprites.y, 20, 18, c.phases[m].x, c.phases[m].y, k, l, e - i.x, f - i.y) && [1, 12, 25, 37, 49].indexOf(c.phase) !== -1 && game.doDamage(i, b.prop.dmg)
                        } else {
                            var e, f;
                            if (c.animated === !0 ? (e = c.phases[c.phase].x, f = c.phases[c.phase].y) : (e = c.x, f = c.y), boxCollision(i.x, i.y, 20, 18, c.posX, c.posY, c.w, c.h) && spriteCollision(j, i.sprites.y, 20, 18, e, f, c.w, c.h, c.posX - i.x, c.posY - i.y)) return game.doDamage(i, b.prop.dmg), void game.removeBullet(a)
                        }
                    }
                }
            }
        })
    }, this.scanBarriers = function() {
        if (!(gfc("combat") % sec(4)))
            for (var a = 0; a < 18; a++) {
                var b = game.combat.barriers[a];
                b.phase += b.dir, 7 != b.phase && 0 != b.phase || (b.dir *= -1)
            }
    }, this.scanIcons = function() {
        ["light", "dark"].forEach(function(a) {
            if (!game.isDead(a)) {
                var b = game.combat.icons[a];
                if (game.combat.bullet[a] === !1 || ["goblin", "phoenix", "knight"].indexOf(b.type) === -1) {
                    if (isOnline()) var c = a == online.sideP1 ? 0 : 1;
                    else var c = getKeyIndex(a);
                    var d = getJoy(c),
                        e = {
                            up: !1,
                            down: !1,
                            left: !1,
                            right: !1
                        };
                    if (d.up ? e.up = !0 : d.down && (e.down = !0), d.left ? e.left = !0 : d.right && (e.right = !0), d.fire === !0 && hold("fire", a), d.fire && (e = {
                            up: !1,
                            down: !1,
                            left: !1,
                            right: !1
                        }, 0 == game.combat.attackRate[a] && (game.joyMoved(c) || "phoenix" == b.type || "banshee" == b.type))) {
                        game.combat.firing[a] = !0;
                        var f = getDirectionByJoy(d);
                        if (f && (b.d = f), b.sprites.bullet.animated === !0 || b.sprites.bullet.type ? game.combat.bullet[a] = cloneObj(b.sprites.bullet) : game.combat.bullet[a] = cloneObj(b.sprites.bullet[b.d]), game.combat.bullet[a].phase = 0, !b.sprites.bullet.type) {
                            game.combat.bullet[a].d = b.d;
                            var g = b.x,
                                h = b.y;
                            if (game.combat.bullet[a].xo ? g += game.combat.bullet[a].xo : "left" == b.d || "leftUp" == b.d || "leftDown" == b.d ? g -= game.combat.bullet[a].w : "right" == b.d || "rightUp" == b.d || "rightDown" == b.d ? g += 18 : "up" != b.d && "down" != b.d || (g += 10 - Math.round(game.combat.bullet[a].w / 2)), game.combat.bullet[a].yo) h += game.combat.bullet[a].yo;
                            else {
                                var i = Math.round(game.combat.bullet[a].h / 2);
                                "leftUp" == b.d || "up" == b.d || "rightUp" == b.d ? h += 2 - i : "leftDown" == b.d || "down" == b.d || "rightDown" == b.d ? h += 17 - i : "left" != b.d && "right" != b.d || (h += 8 - i)
                            }
                            game.combat.bullet[a].posX = g, game.combat.bullet[a].posY = h
                        }
                        game.combat.attackRate[a] = sec(b.prop.attackRate), engine.audio.stop("ready" + ucFirst(a)), snd(b.prop.sounds.fire, !1, a)
                    }!d.fire && game.joyMoved(c) && (game.combat.firing[a] = !1);
                    var j = b.speed / 100;
                    b.slow && (j *= .5, b.slow = !1), e.up && e.left ? (b.d = "leftUp", b.y -= 1 * j, b.x -= 2 * j) : e.up && e.right ? (b.d = "rightUp", b.y -= 1 * j, b.x += 2 * j) : e.down && e.left ? (b.d = "leftDown", b.y += 1 * j, b.x -= 2 * j) : e.down && e.right ? (b.d = "rightDown", b.y += 1 * j, b.x += 2 * j) : e.up ? (b.d = "up", b.y -= 1 * j) : e.down ? (b.d = "down", b.y += 1 * j) : e.left ? (b.d = "left", b.x -= 2 * j) : e.right && (b.d = "right", b.x += 2 * j), b.x < 14 ? b.x = 14 : b.x > 290 && (b.x = 290), b.y < 17 ? b.y = 17 : b.y > 174 && (b.y = 174);
                    for (var k = game.combat.firing[a] && b.sprites.shot ? b.sprites.shot[b.d] : b.sprites.move[diagonalDirection(b.d)][b.animationPhase], l = 0; l < 18; l++) {
                        var m = game.combat.barriers[l];
                        if (7 != m.phase && boxCollision(m.x, m.y, 10, 12, b.x, b.y, 20, 18) && spriteCollision(377 + 10 * m.phase, 313 + 12 * (m.type - 1), 10, 12, k, b.sprites.y, 20, 18, b.x - m.x, b.y - m.y)) {
                            if (6 == m.phase) b.slow = !0;
                            else {
                                var n = b.x + 10 < m.x + 5 ? "left" : "right",
                                    o = b.y + 9 < m.y + 6 ? "top" : "bottom";
                                "top" == o && 1 == m.row && (o = "bottom"), "left" == n && "top" == o ? (b.x = m.x - 21, b.y = m.y - 19) : "right" == n && "top" == o ? (b.x = m.x + 11, b.y = m.y - 19) : "left" == n && "bottom" == o ? (b.x = m.x - 21, b.y = m.y + 13) : "right" == n && "bottom" == o && (b.x = m.x + 11, b.y = m.y + 13)
                            }
                            break
                        }
                    }
                    (e.up || e.down || e.left || e.right) && (b.stepAnimationPhase(), b.startStep()), e.up || e.down || e.left || e.right || b.stopStep()
                }
            }
        })
    }, this.removeBullet = function(a) {
        game.combat.bullet[a].remove = !0
    }, this.isDead = function(a) {
        return game.combat.icons[a].hp <= 0
    }, this.doDamage = function(a, b) {
        game.combat.damage[a.side] += b, a.hp -= b, a.hp <= 0 && (a.dead = !0, a.stopStep()), snd("hitOn" + ucFirst(a.side))
    }, this.getHpBonus = function(a, b, c) {
        return "0" == DATA.board[b][a] ? "dark" == c ? 7 : 0 : "1" == DATA.board[b][a] ? "light" == c ? 7 : 0 : "light" == c ? [7, 6, 4, 3, 1, 0][game.circleStatus] : [0, 1, 3, 4, 6, 7][game.circleStatus]
    }, this.makeShapeshifter = function(a, b) {
        engine.originalSpriteContext.clearRect(0, 360, 485, 18), engine.originalSpriteContext.drawImage(engine.originalSprite, 0, DATA.sprites[a.type].y, 485, 18, 0, 360, 485, 18), engine.originalSpriteImageData = engine.originalSpriteContext.getImageData(0, 0, engine.spriteWidth, engine.spriteHeight), engine.refreshSpriteMap(), game.changeShapeshifterColor(a), b.type = a.type, b.prop = cloneObj(a.prop), b.sprites = cloneObj(DATA.sprites[a.type]), b.sprites.y = 360, b.injuries = 0, b.baseHP = DATA.icons[a.type].baseHP, b.setCombatHp(game.combat.col, game.combat.row, "dark"), b.speed = DATA.icons[a.type].speed, b.dmg = DATA.icons[a.type].dmg, b.shotSpeed = DATA.icons[a.type].shotSpeed, b.attackRate = DATA.icons[a.type].attackRate
    }, this.changeShapeshifterColor = function(a) {
        engine.coloredSpriteCanvasContext.clearRect(0, 360, 485, 18), engine.coloredSpriteCanvasContext.drawImage(engine.originalSprite, 0, DATA.sprites[a.type].y, 485, 18, 0, 360, 485, 18);
        var b = 7;
        if ("earthElemental" == a.type) b = 9;
        else if ("fireElemental" == a.type) {
            b = 2;
            var c = (DATA.colors[engine.options.palette] || DATA.colors["ccs64"])[8]
        } else "waterElemental" == a.type ? b = 6 : "airElemental" == a.type && (b = 15);
        for (var d = (DATA.colors[engine.options.palette] || DATA.colors["ccs64"])[14], e = engine.originalSpriteContext.getImageData(0, 360, 485, 18), f = 0; f < e.data.length; f += 4) 0 == e.data[f + 3] ? (e.data[f] = 0, e.data[f + 1] = 0, e.data[f + 2] = 0, e.data[f + 3] = 0) : e.data[f] == b ? (e.data[f] = parseInt(d[0] + d[1], 16), e.data[f + 1] = parseInt(d[2] + d[3], 16), e.data[f + 2] = parseInt(d[4] + d[5], 16), e.data[f + 3] = 255) : "fireElemental" == a.type && 8 == e.data[f] && (e.data[f] = parseInt(c[0] + c[1], 16), e.data[f + 1] = parseInt(c[2] + c[3], 16), e.data[f + 2] = parseInt(c[4] + c[5], 16), e.data[f + 3] = 255);
        engine.coloredSpriteCanvasContext.putImageData(e, 0, 360), engine.makeSpriteImageBitmap(engine.coloredSpriteCanvas)
    }, this.clearVisualFilter = function() {
        engine.visualFilterContext.clearRect(0, 0, engine.visualFilter.width, engine.visualFilter.height)
    }, this.visualFilter = function() {
        game.clearVisualFilter(), "scanlines" == engine.options.visualFilter ? game.visualFilterHorizontalLines() : "bwTv" == engine.options.visualFilter ? (game.visualFilterHorizontalLines(), opacity(.6), game.visualFilterNoise(), opacity(1), engine.visualFilterContext.fillStyle = bwTvGradient, engine.visualFilterContext.fillRect(0, 0, engine.visualFilter.width, engine.visualFilter.height)) : "colorTv" == engine.options.visualFilter ? (opacity(.5), game.visualFilterNoise(!0), opacity(1), game.visualFilterHorizontalLines()) : "greenC64monitor" == engine.options.visualFilter && game.visualFilterHorizontalLines()
    }, this.visualFilterHorizontalLines = function() {
        engine.visualFilterContext.fillStyle = "#" + (DATA.colors[engine.options.palette] || DATA.colors["ccs64"])[0];
        for (var a = 0; a < engine.visualFilter.height; a += 3) engine.visualFilterContext.fillRect(0, a, engine.visualFilter.width, 1)
    }, this.visualFilterNoise = function(a) {
        for (var b = -Math.floor(120 * Math.random()), c = -Math.floor(120 * Math.random()), d = c; d < engine.visualFilter.height; d += 384)
            for (var e = b; e < engine.visualFilter.width; e += 384) engine.visualFilterContext.drawImage(getElement("crtNoise" + (a ? "Color" : "")), 0, 0, 128, 128, e, d, 384, 384)
    }
}

function ArchonAudio() {
    this.init = function() {
        this.audioContext = window.AudioContext || window.webkitAudioContext, this.context = new this.audioContext, this.neededResources = ["music.ogg", "readyLight.ogg", "readyDark.ogg", "stepKnight.ogg", "stepValkyrie.ogg", "stepGolem.ogg", "stepUnicorn.ogg", "stepPhoenix.ogg", "stepBasilisk.ogg", "stepDragon.ogg", "teleport.ogg", "shotMelee.ogg", "shotRanged.ogg", "shotPhoenix.ogg", "shotBanshee.ogg", "hitOnLight.ogg", "hitOnDark.ogg"], this.sounds = {}, this.queue = [], this.activeSounds = []
    }, this.request = function(e) {
        for (var o = 0; o < this.queue.length; o++)
            if (this.queue[o].name == e.name && (!e.side || e.side && this.queue[o].side == e.side)) return;
        for (var o = 0; o < this.activeSounds.length; o++)
            if (0 === this.activeSounds[o].name.indexOf(e.name) && e.loop && (!e.side || e.side && this.activeSounds[o].side == e.side)) return;
        return this.queue.push(e), isOnline() && 1 == online.playerNo && online.send({
            action: "soundRequest",
            name: e.name,
            loop: e.loop,
            side: e.side
        }), !0
    }, this.playQueue = function() {
        for (var e = 0; e < this.queue.length; e++) {
            var o = this.queue[e];
            if (o.name) {
                void 0 === o.loop && (o.loop = !1);
                var t = this.play(o.name, o.loop);
                t && this.activeSounds.push({
                    name: o.name,
                    side: o.side,
                    bufferSource: t
                })
            }
        }
        this.queue = []
    }, this.stop = function(e, o) {
        for (var t = 0; t < this.queue.length; t++) this.queue[t].name == e && (!o || o && this.queue[t].side === o) && (this.queue[t].name = !1);
        for (var t = 0; t < this.activeSounds.length; t++) 0 === this.activeSounds[t].name.indexOf(e) && (!o || o && this.activeSounds[t].side === o) && (this.activeSounds[t].bufferSource.stop(0), this.activeSounds[t].name = "_stopped");
        isOnline() && 1 == online.playerNo && online.send({
            action: "stopSound",
            name: e,
            side: o
        })
    }, this.stopAllSound = function(e) {
        isOnline() && 1 == online.playerNo && !e && online.send({
            action: "stopAllSound"
        });
        for (var o = 0; o < this.activeSounds.length; o++) "_stopped" != this.activeSounds[o].name && this.activeSounds[o].bufferSource.stop(0);
        this.queue = [], this.activeSounds = [], isFirefox && (this.context = null, this.context = new this.audioContext)
    }, this.loadAudioResource = function(e) {
        var o = this.neededResources[e],
            t = o.split(".")[0],
            n = new XMLHttpRequest;
        n.open("GET", "audio/v1.0/" + o, !0), n.responseType = "arraybuffer", n.onload = function() {
            engine.audio.context.decodeAudioData(n.response, function(o) {
                engine.audio.sounds[t] = o, e + 1 < engine.audio.neededResources.length && engine.audio.loadAudioResource(e + 1), engine.loadedResourcesCount++
            }, function(e) {})
        }, n.send()
    }, this.play = function(e, o) {
        if ("off" == engine.options.sound) return !1;
        o = o ? !0 : !1;
        var t = this.context.createBufferSource();
        return t.buffer = this.sounds[e], t.loop = o, t.connect(this.context.destination), t.start(this.context.currentTime, 0), t
    }
}

function ArchonEngine() {
    this.audio, this.options = {}, this.pressedKeys = [], this.enableKeys = !1, this.loadResourcesInterval = !1, this.neededResourcesCount = 1, this.loadedResourcesCount = 0, this.spriteImage = new Image, this.spriteWidth = 485, this.spriteHeight = 378, this.scale = 3, this.room = !1, this.setRoom = function() {
        engine.room = document.location.hash.substr(1, 8), 8 != engine.room.length && (engine.room = !1)
    }, this.init = function() {
        engine.setRoom(), void engine.checkSystemRequirements(function() {
            engine.audio = new ArchonAudio, engine.audio.init(), engine.neededResourcesCount += engine.audio.neededResources.length, engine.setOptions(), engine.loadResources(function() {
                Menu.refreshActiveOptions(), show("menuToggler"), engine.consoleMessage(), engine.initKeyHandling(), online = new ArchonOnline, game = new ArchonGame("menu"), game.setMenu("light"), engine.initEngine(), engine.applyVisualFilter(), show("screen"), engine.room && online.initOnlineGame()
            })
        }, function() {
            document.location = "/unsupported-browser.html"
        })
    }, this.checkSystemRequirements = function(e, n) {
        var i = !0;
        "undefined" == typeof Storage && (i = !1), (window.AudioContext || window.webkitAudioContext || !1) === !1 && (i = !1), isSafari && (i = !1);
        var t = document.createElement("canvas");
        t.getContext && t.getContext("2d") || (i = !1), window.animFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame, window.animFrame || (i = !1), window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection || window.msRTCPeerConnection || (i = !1), i ? e() : n()
    }, this.setOptions = function() {
        engine.options = {
            visualFilter: localStorage.getItem("visualFilter") || "scanlines",
            palette: localStorage.getItem("palette") || "ccs64",
            sound: localStorage.getItem("sound") || "on",
            onlineControl: localStorage.getItem("onlineControl") || "keyboard",
            lightControl: localStorage.getItem("lightControl") || "keyboardWasd",
            darkControl: localStorage.getItem("darkControl") || "keyboardArrows"
        }
    }, this.loadResources = function(e) {
        engine.loadResourcesInterval = setInterval(function() {
            engine.loadedResourcesCount == engine.neededResourcesCount && (clearInterval(engine.loadResourcesInterval), e())
        }, 100), engine.spriteImage.src = "images/v1.0/sprites.png", engine.spriteImage.onload = function() {
            engine.originalSprite = document.createElement("canvas"), engine.originalSprite.width = engine.spriteWidth, engine.originalSprite.height = engine.spriteHeight, engine.originalSpriteContext = engine.originalSprite.getContext("2d"), engine.originalSpriteContext.drawImage(engine.spriteImage, 0, 0), engine.originalSpriteImageData = engine.originalSpriteContext.getImageData(0, 0, engine.spriteWidth, engine.spriteHeight), engine.refreshSpriteMap(), engine.changeGameSpriteColors(), engine.loadedResourcesCount++
        }, engine.audio.loadAudioResource(0)
    }, this.consoleMessage = function() {}, this.initKeyHandling = function() {
        document.onkeydown = function(e) {
            var n = e.which;
            if (27 == n && game.resetOnlineGame(), !DEV || 116 != n && 123 != n) {
                if (engine.enableKeys || e.preventDefault(), isOnline() || (16 == n && e.location > 1 ? n = 0 : 17 == n && e.location < 2 && (n = 0)), 13 == n && (n = 17), isOnline())
                    if (1 == online.playerNo)
                        for (var i in DATA.keys[1]) n == DATA.keys[1][i] && (n = DATA.keys[0][i]);
                    else if (2 == online.playerNo)
                    for (var i in DATA.keys[0]) n == DATA.keys[0][i] && (n = DATA.keys[1][i]);
                (engine.pressedKeys[n] === !1 || void 0 === engine.pressedKeys[n]) && (engine.pressedKeys[n] = !0), isOnline() && 2 == online.playerNo && online.sendPressedKeys()
            }
        }, document.onkeyup = function(e) {
            var n = e.which;
            if (engine.enableKeys || e.preventDefault(), isOnline() || (16 == n && e.location > 1 ? n = 0 : 17 == n && e.location < 2 && (n = 0)), 13 == n && (n = 17), isOnline())
                if (1 == online.playerNo)
                    for (var i in DATA.keys[1]) n == DATA.keys[1][i] && (n = DATA.keys[0][i]);
                else if (2 == online.playerNo)
                for (var i in DATA.keys[0]) n == DATA.keys[0][i] && (n = DATA.keys[1][i]);
            engine.pressedKeys[n] = !1, isOnline() && 2 == online.playerNo && online.sendPressedKeys()
        }, window.onblur = function() {
            for (var e = 0; e < engine.pressedKeys.length; e++)(engine.pressedKeys[e] === !0 || "hold" === engine.pressedKeys[e]) && (engine.pressedKeys[e] = !1);
            isOnline() && 2 == online.playerNo && online.sendPressedKeys()
        }
    }, this.initEngine = function() {
        engine.canvasElement = getElement("screen"), engine.canvas = engine.canvasElement.getContext("2d"), engine.canvas.font = 8 * engine.scale + "px C64ProRegular", engine.canvas.textAlign = "left", engine.canvas.textBaseline = "top", engine.visualFilter = getElement("visualFilterLayer"), engine.visualFilterContext = engine.visualFilter.getContext("2d"), document.addEventListener("visibilitychange", function(e) {
            isOnline() || (document.hidden ? game.togglePause(!0) : Menu.isVisible() || game.togglePause(!1))
        }), window.onresize = function() {
            engine.fullWidth = getElement("border").offsetWidth, engine.fullHeight = getElement("border").offsetHeight;
            var e = 0;
            engine.fullWidth > 320 * engine.scale && engine.fullHeight > 200 * engine.scale && (e = 100, engine.fullWidth = engine.fullWidth - e, engine.fullHeight = engine.fullHeight - e);
            var n = engine.fullWidth / engine.canvasElement.width,
                i = engine.fullHeight / engine.canvasElement.height,
                t = Math.min(n, i);
            engine.canvasElement.style.transform = "scale(" + t + ")", engine.canvasElement.style.webkitTransform = "scale(" + t + ")";
            var o = Math.round((engine.fullWidth - 320 * engine.scale * t) / 2) + e / 2,
                a = Math.round((engine.fullHeight - 200 * engine.scale * t) / 2) + e / 2;
            engine.canvasElement.style.margin = a + "px " + o + "px 0px " + o + "px", engine.visualFilter.width = window.innerWidth, engine.visualFilter.height = window.innerHeight, bwTvGradient = engine.visualFilterContext.createRadialGradient(window.innerWidth / 2, window.innerHeight / 2, 200 * engine.scale * t * .4, window.innerWidth / 2, window.innerHeight / 2, 320 * engine.scale * t * .8), bwTvGradient.addColorStop(0, "rgba(0,0,0,0)"), bwTvGradient.addColorStop(1, "rgba(0,0,0,.9)");
            var s = getElement("onlineLink").style;
            s.transform = "scale(" + t + ")", s.webkitTransform = "scale(" + t + ")", s.marginLeft = o + "px", s.marginTop = a + 200 * engine.scale * t - 26 * t + "px"
        }, window.onresize(), engine.scanFPS = 50, engine.scanFrameTime = 1e3 / engine.scanFPS, engine.animationFrameCounter = 0, engine.scanFrameCounter = 0, engine.animation(), engine.startScan()
    }, this.changeGameSpriteColors = function(e) {
        e = e || engine.options.palette || "ccs64";
        if (!DATA.colors[e]) e = "ccs64";
        var n = document.createElement("canvas");
        n.width = engine.spriteWidth, n.height = engine.spriteHeight;
        var i = n.getContext("2d");
        i.drawImage(engine.spriteImage, 0, 0);
        for (var t = i.getImageData(0, 0, engine.spriteWidth, engine.spriteHeight), o = 0; o < engine.originalSpriteImageData.data.length; o += 4)
            if (0 === engine.originalSpriteImageData.data[o + 3]) t.data[o] = 0, t.data[o + 1] = 0, t.data[o + 2] = 0, t.data[o + 3] = 0;
            else {
                var a = DATA.colors[e][engine.originalSpriteImageData.data[o]] || DATA.colors[e][0];
                t.data[o] = parseInt(a[0] + a[1], 16), t.data[o + 1] = parseInt(a[2] + a[3], 16), t.data[o + 2] = parseInt(a[4] + a[5], 16), t.data[o + 3] = 255
            }
        i.putImageData(t, 0, 0), engine.coloredSpriteCanvas = n, engine.coloredSpriteCanvasContext = engine.coloredSpriteCanvas.getContext("2d"), game && game.combat.icons.dark && 1 == game.combat.icons.dark.shapeshifter ? game.changeShapeshifterColor(game.combat.icons.light) : engine.makeSpriteImageBitmap(engine.coloredSpriteCanvas)
    }, this.makeSpriteImageBitmap = function(e) {
        engine.sprite = e, "function" == typeof window.createImageBitmap && Promise.all([createImageBitmap(e, 0, 0, engine.spriteWidth, engine.spriteHeight)]).then(function(e) {
            engine.sprite = e[0]
        })
    }, this.refreshSpriteMap = function() {
        engine.spriteMap = [
            []
        ];
        for (var e = 0, n = 0, i = 3; i < engine.originalSpriteImageData.data.length; i += 4) engine.spriteMap[n][e] = !!engine.originalSpriteImageData.data[i], e++, e == engine.spriteWidth && n < engine.spriteHeight - 1 && (e = 0, n++, engine.spriteMap[n] = [])
    }, this.applyVisualFilter = function() {
        var e = engine.options.visualFilter;
        engine.canvasElement, engine.canvas;
        "none" == e ? (engine.vfImageRendering("pixelated"), engine.vfFilter("blur(0px)"), engine.vfSmoothing(!1), engine.options.palette = "ccs64") : "scanlines" == e ? (engine.vfImageRendering("pixelated"), engine.vfFilter("blur(0px)"), engine.vfSmoothing(!1), engine.options.palette = "ccs64") : "bwTv" == e ? (engine.vfImageRendering("initial"), engine.vfFilter("blur(1px)"), engine.vfSmoothing(!1), engine.options.palette = "grayscale") : "colorTv" == e ? (engine.vfImageRendering("initial"), engine.vfFilter("contrast(1.3) brightness(1.6) saturate(1.6) blur(1px)"), engine.vfSmoothing(!0), engine.options.palette = "vice") : "greenC64monitor" == e && (engine.vfImageRendering("initial"), engine.vfFilter("brightness(1.3) blur(1px)"), engine.vfSmoothing(!1), engine.options.palette = "green"), localStorage.setItem("palette", engine.options.palette), getElement("onlineLink").style.color = "#" + (DATA.colors[engine.options.palette] || DATA.colors["ccs64"])[1], engine.changeGameSpriteColors(), refreshBorderColor()
    }, this.vfImageRendering = function(e) {
        engine.canvasElement.style.imageRendering = e, engine.visualFilter.style.imageRendering = e
    }, this.vfFilter = function(e) {
        getElement("border").style.webkitFilter = e, getElement("border").style.filter = e
    }, this.vfSmoothing = function(e) {
        engine.canvas.imageSmoothingEnabled = e, engine.canvas.mozImageSmoothingEnabled = e, engine.visualFilterContext.imageSmoothingEnabled = e, engine.visualFilterContext.mozImageSmoothingEnabled = e
    }, this.animation = function() {
        window.animFrame(function() {
            game.paused || engine.animationRoutine(), engine.animation()
        })
    }, this.startScan = function() {
        setInterval(function() {
            game.paused || engine.scanRoutine()
        }, engine.scanFrameTime)
    }, this.animationRoutine = function() {
        engine.animationFrameCounter++, game.animationRoutine()
    }, this.scanRoutine = function() {
        game.refreshPressedKeysByGamepad(), isOnline() && 1 != online.playerNo || (engine.scanFrameCounter++, game.scanRoutine()), isOnline() && online.connected && (2 == online.playerNo ? (online.processPacket(), online.processSounds()) : 1 == online.playerNo && (online.makePacket(), online.sendPacket())), engine.audio.playQueue()
    }
}

function ArchonOnline() {
    this.playerNo = 0, this.readyP1 = !1, this.readyP2 = !1, this.sideP1 = "light", this.sideP2 = "dark", this.roomData = !1, this.connected = !1, this.message = !1, this.disconnectedText = !1, this.packet = {}, this.lastPacket = "", this.lastPressedKeys = "", this.p2Packet = !1, this.p2Sounds = [], this.socket = null, this.sid = document.body.getAttribute("data-sid"), this.packetGameVariables = ["scene", "startedBy", "circleStatus", "circleDirection", "actualSide", "enemySide", "cursor", "line1", "line2", "spelling", "spellIndex", "spells", "delayName", "frameCounters", "teleport", "exchange", "revive"], this.packetIconVariables = ["shapeshifter", "type", "prop", "sprites", "baseHP", "speed", "dmg", "shotSpeed", "attackRate", "canFly", "maxSteps", "slow", "col", "row", "x", "y", "d", "hp", "injuries", "imprisoned", "dead", "selected", "animationPhase"], window.addEventListener("hashchange", function() {
        var e = document.location.hash.substr(1, 8);
        8 != e.length && (e = !1), engine.room && e && setTimeout(function() {
            document.location.hash = e
        }, 500), online.reset(), engine.setRoom(), engine.room ? (online.disconnectedText = !1, hide("menuToggler"), online.initOnlineGame()) : (show("menuToggler"), game.resetNextStep(), game.setMenu("light"))
    }, !1), window.onbeforeunload = window.onunload = function() {
        online.peer && online.peer.destroy(), online.conn && online.conn.close()
    }, this.generateRoomId = function() {
        for (var e = "", n = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", o = 0; 8 > o; o++) e += n.charAt(Math.floor(36 * Math.random()));
        return e
    }, this.startNewOnlineGame = function() {
        online.reset(), hide("menuToggler"), document.location.hash = online.generateRoomId()
    }, this.startOfflineGame = function() {
        document.location.hash = ""
    }, this.getRoom = function(e) {
        var n = {
            room: engine.room,
            action: "getRoom"
        };
        ajax("/api/room", n, function(n) {
            e(n.data)
        })
    }, this.createRoom = function(e) {
        var n = {
            room: engine.room,
            sid: online.sid,
            action: "createRoom"
        };
        ajax("/api/room", n, function(n) {
            e(n.data)
        })
    }, this.join = function(e) {
        var n = {
            room: engine.room,
            sid: online.sid,
            action: "join"
        };
        ajax("/api/room", n, function(n) {
            e(n.data)
        })
    }, this.initOnlineGame = function() {
        hide("menuToggler"), online.message = "Checking room...", online.getRoom(function(e) {
            online.roomData = e, e ? e.p1Sid && e.p1Sid == online.sid && !e.p2Sid ? (online.message = "Send this link to invite a friend:", online.playerNo = 1, online.initOnlineLink(), online.connectionListener()) : e.p1Sid && e.p1Sid != online.sid && !e.p2Sid ? (online.message = "Joining...", online.join(function(e) {
                online.roomData = e, online.message = "Connecting...", online.playerNo = 2, online.connectionListener()
            })) : e.p1Sid && e.p2Sid && online.sid != e.p1Sid && online.sid != e.p2Sid ? online.startOfflineGame() : e.p1Sid && e.p2Sid && (e.p1Sid == online.sid || e.p2Sid == online.sid) && online.startOfflineGame() : (online.message = "Creating room...", online.createRoom(function(e) {
                online.roomData = e, online.message = "Send this link to invite a friend:", online.playerNo = 1, online.initOnlineLink(), online.connectionListener()
            }))
        })
    }, this.initOnlineLink = function() {
        var e = getElement("onlineLink");
        e.value = window.location.origin + "/multiplayer.html#" + engine.room, show("onlineLink"), engine.enableKeys = !0, e.onmousedown = e.onmouseup = e.onclick = function(e) {
            e.preventDefault(), e.stopPropagation(), this.blur(), this.focus(), this.select()
        }
    }, this.hideOnlineLink = function() {
        hide("onlineLink"), engine.enableKeys = !1;
        var e = getElement("onlineLink");
        e.onmousedown = e.onmouseup = e.onclick = function() {}
    }, this.connectionListener = function() {
        if (!online.socket) {
            online.socket = io()
            online.socket.on("peer-ready", function() {
                online.message = "Connecting..."
                online.hideOnlineLink()
                online.connectingSuccessful()
            })
            online.socket.on("msg", function(data) {
                online.receiveData(data)
            })
            online.socket.on("peer-disconnected", function() {
                online.disconnectedText = !0, online.startOfflineGame()
            })
            online.socket.on("disconnect", function() {
                online.connected && (online.disconnectedText = !0, online.startOfflineGame())
            })
        }
        online.socket.emit("room-join", engine.room, online.playerNo)
    }, this.reset = function() {
        online.socket && (online.socket.disconnect(), online.socket = null)
        online.playerNo = 0, online.readyP1 = !1, online.readyP2 = !1, online.message = "", online.hideOnlineLink(), online.connected = !1, online.lastPacket = "", online.lastPressedKeys = "", online.roomData = !1, engine.room = !1, hide("ctrlOnline"), hide("disconnect"), show("ctrlLight"), show("ctrlDark"), show("menuToggler")
    }, this.connectingSuccessful = function() {
        online.connected = !0, show("ctrlOnline"), show("disconnect"), hide("ctrlLight"), hide("ctrlDark"), show("menuToggler")
    }, this.send = function(e) {
        online.socket && online.connected && online.socket.emit("msg", JSON.stringify(e))
    }, this.testReady = function() {
        online.readyP1 && online.readyP2 && game.startNewGame(game.actualSide)
    }, this.receiveData = function(e) {
        if (e = JSON.parse(e), 1 == online.playerNo && "refreshKeys" == e.action) {
            for (var n in DATA.keys[1])("hold" !== engine.pressedKeys[DATA.keys[1][n]] || e.pressedKeys[DATA.keys[1][n]] !== !0) && (engine.pressedKeys[DATA.keys[1][n]] = e.pressedKeys[DATA.keys[1][n]]);
            "menu" != game.scene || online.readyP2 || getJoy(1).fire !== !0 ? "menu" != game.scene && e.pressedKeys[27] === !0 && game.resetOnlineGame() : (online.readyP2 = !0, online.testReady())
        } else 2 == online.playerNo && "packet" == e.action ? online.p2Packet = e.packet : 2 == online.playerNo && "soundRequest" == e.action ? online.p2Sounds.push({
            type: "request",
            data: {
                name: e.name,
                loop: e.loop,
                side: e.side
            }
        }) : 2 == online.playerNo && "stopSound" == e.action ? online.p2Sounds.push({
            type: "stop",
            data: {
                name: e.name,
                side: e.side
            }
        }) : 2 == online.playerNo && "stopAllSound" == e.action ? online.p2Sounds.push({
            type: "stopAll"
        }) : 2 == online.playerNo && "setIcons" == e.action ? game.setIcons() : 2 == online.playerNo && "setToggler" == e.action ? Menu.setToggler(e.state) : 2 == online.playerNo && "createElemental" == e.action ? (game.icons.push(new ArchonIcon(e.type, e.col, e.row, game.icons.length)), game.selectedIcon = game.icons[game.icons.length - 1], game.selectedIcon.d = e.d, game.selectedIcon.x = e.x, game.selectedIcon.y = e.y, game.selectedIcon.selected = !0) : 2 == online.playerNo && "makeShapeshifter" == e.action && game.makeShapeshifter(game.icons[e.light], game.icons[e.dark])
    }, this.makePacket = function() {
        online.packet = {
            online: {
                sideP1: online.sideP1,
                sideP2: online.sideP2,
                readyP1: online.readyP1,
                readyP2: online.readyP2
            },
            game: {},
            icons: []
        };
        for (var e = 0; e < online.packetGameVariables.length; e++) {
            var n = online.packetGameVariables[e];
            online.packet.game[n] = "object" == typeof game[n] ? cloneObj(game[n]) : game[n]
        }
        game.combat.icons.light !== !1 && (game.combat.icons.light = game.combat.icons.light._num, game.combat.icons.dark = game.combat.icons.dark._num), online.packet.game.combat = cloneObj(game.combat), game.combat.icons.light !== !1 && (game.combat.icons.light = game.icons[game.combat.icons.light], game.combat.icons.dark = game.icons[game.combat.icons.dark]);
        for (var o = 0; o < game.icons.length; o++) {
            online.packet.icons[o] = {};
            for (var e = 0; e < online.packetIconVariables.length; e++) {
                var n = online.packetIconVariables[e];
                ("type" != n && "prop" != n && "sprites" != n && "baseHP" != n && "speed" != n && "dmg" != n && "shotSpeed" != n && "attackRate" != n || game.icons[o].shapeshifter) && ("prop" == n || "sprites" == n ? online.packet.icons[o][n] = cloneObj(game.icons[o][n]) : online.packet.icons[o][n] = game.icons[o][n])
            }
        }
        if (online.packet.game.selectedIcon = game.selectedIcon === !1 ? !1 : game.selectedIcon._num, online.packet.game.cannotMoveIcon = game.cannotMoveIcon === !1 ? !1 : game.cannotMoveIcon._num, online.packet.game.teleport.icon = game.teleport.icon === !1 ? !1 : game.teleport.icon._num, online.packet.game.exchange.icon1 = game.exchange.icon1 === !1 ? !1 : game.exchange.icon1._num, online.packet.game.exchange.icon2 = game.exchange.icon2 === !1 ? !1 : game.exchange.icon2._num, online.packet.game.revive.deadIcons = !1, game.revive.deadIcons !== !1) {
            online.packet.game.revive.deadIcons = [];
            for (var e = 0; e < game.revive.deadIcons.length; e++) online.packet.game.revive.deadIcons[e] = game.revive.deadIcons[e]._num
        }
    }, this.sendPacket = function() {
        if ("combat" != online.packet.game.scene) {
            var e = JSON.stringify(online.packet);
            if (online.lastPacket == e) return;
            online.lastPacket = e
        }
        online.send({
            action: "packet",
            packet: online.packet
        })
    }, this.processPacket = function() {
        if (online.p2Packet) {
            online.p2Packet;
            online.sideP1 = online.p2Packet.online.sideP1, online.sideP2 = online.p2Packet.online.sideP2, online.readyP1 = online.p2Packet.online.readyP1, online.readyP2 = online.p2Packet.online.readyP2;
            for (var e in online.p2Packet.game) game[e] = "object" == typeof online.p2Packet.game[e] ? cloneObj(online.p2Packet.game[e]) : online.p2Packet.game[e];
            for (var n = 0; n < online.p2Packet.icons.length; n++)
                if (game.icons[n]) {
                    var o = online.p2Packet.icons[n];
                    for (var i in o) "prop" == i || "sprites" == i ? game.icons[n][i] = cloneObj(o[i]) : game.icons[n][i] = o[i]
                }
            if (game.selectedIcon = online.p2Packet.game.selectedIcon === !1 ? !1 : game.icons[online.p2Packet.game.selectedIcon], game.cannotMoveIcon = online.p2Packet.game.cannotMoveIcon === !1 ? !1 : game.icons[online.p2Packet.game.cannotMoveIcon], game.teleport.icon = online.p2Packet.game.teleport.icon === !1 ? !1 : game.icons[online.p2Packet.game.teleport.icon], game.exchange.icon1 = online.p2Packet.game.exchange.icon1 === !1 ? !1 : game.icons[online.p2Packet.game.exchange.icon1], game.exchange.icon2 = online.p2Packet.game.exchange.icon2 === !1 ? !1 : game.icons[online.p2Packet.game.exchange.icon2], game.combat.icons.light = online.p2Packet.game.combat.icons.light === !1 ? !1 : game.icons[online.p2Packet.game.combat.icons.light], game.combat.icons.dark = online.p2Packet.game.combat.icons.dark === !1 ? !1 : game.icons[online.p2Packet.game.combat.icons.dark], online.p2Packet.game.revive.deadIcons === !1) game.revive.deadIcons = !1;
            else {
                game.revive.deadIcons = [];
                for (var n = 0; n < online.p2Packet.game.revive.deadIcons.length; n++) game.revive.deadIcons[n] = game.icons[online.p2Packet.game.revive.deadIcons[n]]
            }
            online.p2Packet = !1
        }
    }, this.processSounds = function() {
        if (online.p2Sounds.length) {
            for (var e = 0; e < online.p2Sounds.length; e++) {
                var n = online.p2Sounds[e];
                "request" == n.type ? engine.audio.request({
                    name: n.data.name,
                    loop: n.data.loop,
                    side: n.data.side
                }) : "stop" == n.type ? engine.audio.stop(n.data.name, n.data.side) : "stopAll" == n.type && engine.audio.stopAllSound()
            }
            online.p2Sounds = []
        }
    }, this.sendPressedKeys = function() {
        var e = JSON.stringify(engine.pressedKeys);
        online.lastPressedKeys != e && (online.lastPressedKeys = e, online.send({
            action: "refreshKeys",
            pressedKeys: engine.pressedKeys
        }))
    }
}
var Menu = function() {
        var e = getElement("menuToggler"),
            n = getElement("menu");
        getElement("menuOverlay").onclick = function() {
            n.classList.contains("opened") && o()
        }, e.onclick = function() {
            t()
        }, I("#menu .l1", function(e) {
            e.onclick = function(e) {
                if (e.target.classList.contains("l1")) {
                    var n = this.querySelector(".items");
                    n && (n.style.height = n.scrollHeight + "px", n.classList.toggle("closed"), l(n))
                }
            }
        }), getElement("menu .back").onclick = function() {
            o()
        };
        var t = function() {
                isOnline() || game.togglePause(!0), show("menuOverlay"), hide("menuToggler"), n.classList.add("opened"), getElement("body").classList.add("menu"), c || a(), setTimeout(function() {
                    window.onresize()
                }, 220)
            },
            o = function() {
                l(), n.classList.remove("opened"), getElement("body").classList.remove("menu"), show("menuToggler"), hide("menuOverlay"), isOnline() || game.togglePause(!1), setTimeout(function() {
                    window.onresize()
                }, 220)
            },
            l = function(e) {
                I("#menu .l1 .items", function(n) {
                    e && e === n || n.classList.add("closed")
                })
            },
            i = function(n) {
                "small" === n || 0 === n ? e.classList.add("small") : ("full" === n || 1 === n) && e.classList.remove("small")
            },
            s = function() {
                I("#menu .items > div", function(e) {
                    e.classList.remove("active")
                });
                for (var e = ["visualFilter", "sound", "onlineControl", "lightControl", "darkControl"], n = 0; n < e.length; n++) getElement(e[n] + 'Select div[data-value="' + engine.options[e[n]] + '"]').classList.add("active")
            },
            r = function(e) {
                return e.getAttribute("data-value") || ""
            };
        getElement("toggleFullscreen").onclick = function() {
            var e = window.document,
                n = e.documentElement,
                t = n.requestFullscreen || n.mozRequestFullScreen || n.webkitRequestFullScreen || n.msRequestFullscreen,
                o = e.exitFullscreen || e.mozCancelFullScreen || e.webkitExitFullscreen || e.msExitFullscreen;
            e.fullscreenElement || e.mozFullScreenElement || e.webkitFullscreenElement || e.msFullscreenElement ? o.call(e) : t.call(n)
        }, I("#visualFilterSelect > div", function(e) {
            e.onclick = function() {
                var e = r(this);
                engine.options.visualFilter = e, localStorage.setItem("visualFilter", e), s(), engine.applyVisualFilter(), "none" == e && game.clearVisualFilter(), game.animationRoutine()
            }
        }), I("#soundSelect > div", function(e) {
            e.onclick = function() {
                var e = r(this);
                "off" == e ? engine.audio.stopAllSound(!0) : engine.audio.queue = [], engine.options.sound = e, localStorage.setItem("sound", e), s()
            }
        }), I("#onlineControlSelect > div", function(e) {
            e.onclick = function() {
                var e = r(this);
                engine.options.onlineControl = e, localStorage.setItem("onlineControl", e), s()
            }
        }), I("#lightControlSelect > div", function(e) {
            e.onclick = function() {
                var e = r(this);
                engine.options.lightControl = e, localStorage.setItem("lightControl", e), s(), "keyboardArrows" == engine.options.lightControl && "keyboardArrows" == engine.options.darkControl ? getElement('darkControlSelect > div[data-value="keyboardWasd"]').click() : "keyboardWasd" == engine.options.lightControl && "keyboardWasd" == engine.options.darkControl && getElement('darkControlSelect > div[data-value="keyboardArrows"]').click()
            }
        }), I("#darkControlSelect > div", function(e) {
            e.onclick = function() {
                var e = r(this);
                engine.options.darkControl = e, localStorage.setItem("darkControl", e), s(), "keyboardArrows" == engine.options.darkControl && "keyboardArrows" == engine.options.lightControl ? getElement('lightControlSelect > div[data-value="keyboardWasd"]').click() : "keyboardWasd" == engine.options.darkControl && "keyboardWasd" == engine.options.lightControl && getElement('lightControlSelect > div[data-value="keyboardArrows"]').click()
            }
        }), getElement("disconnect").onclick = function() {
            o(), online.peer && online.peer.destroy(), online.conn && online.conn.close()
        };
        var c = !1,
            a = function() {
                c = !0, DEV || (! function(e, n, t) {
                        var o, l = e.getElementsByTagName(n)[0],
                            i = /^http:/.test(e.location) ? "http" : "https";
                        e.getElementById(t) || (o = e.createElement(n), o.id = t, o.src = i + "://platform.twitter.com/widgets.js", l.parentNode.insertBefore(o, l))
                    }
                    (document, "script", "twitter-wjs"),
                    function(e, n, t) {
                        var o, l = e.getElementsByTagName(n)[0];
                        e.getElementById(t) || (o = e.createElement(n), o.id = t, o.src = "//connect.facebook.net/hu_HU/all.js#xfbml=1", l.parentNode.insertBefore(o, l))
                    }
                    (document, "script", "facebook-jssdk"),
                    function() {
                        var e = document.createElement("script");
                        e.type = "text/javascript", e.async = !0, e.src = "https://apis.google.com/js/plusone.js";
                        var n = document.getElementsByTagName("script")[0];
                        n.parentNode.insertBefore(e, n)
                    }
                    ())
            };
        return {
            refreshActiveOptions: s,
            isVisible: function() {
                return n.classList.contains("opened")
            },
            setToggler: i
        }
    }
    ();
var game, online, engine = new ArchonEngine();
engine.init();
